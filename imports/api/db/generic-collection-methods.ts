import _ from 'lodash'
import { Mongo } from 'meteor/mongo'
import type { CollectionFindParams, DocumentsCursor } from '/imports/api/db/db.types'

// ---

export async function insert<DocType>(
	collection: Mongo.Collection<DocType>,
	// insert in meteor = insertOne in mongo
	document: UnionOmit<DocType, '_id'>,
	replay: boolean | undefined = true
) {
	const timestamp = new Date()

	const baseDocument = _.assign(document, {
		_id: _.get(document, '_id') || new Mongo.ObjectID().toHexString(),
		createdAt: timestamp,
		updatedAt: timestamp,
	})

	// prettier-ignore
	const enrichedDocument = replay ? baseDocument
	: _.assign(
		baseDocument,
		{
			initialInsert: _.cloneDeep(baseDocument),
			modifierHistory: [],
		}
	)

	return await collection.insert(enrichedDocument)
}

export async function update<DocType>(
	collection: Mongo.Collection<DocType>,
	selector: Mongo.Selector<DocType>,
	modifier: Mongo.Modifier<DocType>,
	replay: boolean | undefined = true
) {
	// perform actual update
	const modifierWithMetadata = _.assign(modifier, {
		$set: _.assign(_.get(modifier, '$set'), { updatedAt: new Date() }),
	})
	const updateResult = collection.update(selector, modifierWithMetadata)

	if (Meteor.isServer && replay) {
		// add update to modifierHistory
		const modifierWithMetadataAndModifierHistory = _.assign(modifierWithMetadata, {
			$push: {
				modifierHistory: {
					timestamp: new Date(),
					update: modifierWithMetadata,
				},
			},
		})
		await collection.update(selector, modifierWithMetadataAndModifierHistory)
	}

	return await updateResult
}

export async function find<DocType>({
	collection,
	selector = {},
	options = {},
	replayDate,
}: CollectionFindParams<DocType>) {
	if (replayDate && Meteor.isServer) {
		console.log('\nreplayDate server find:', replayDate)
		const documents: DocumentsCursor<DocType> = await collection.find(selector, options)

		// create temporary collection
		// TODO index to delete inserted documents after a certain time or so (this entails resetting replayDate after that time)
		const { C } = await import('/imports/startup/server/server-constants')
		const memoryCollection = C.memoryDb.db?.collection(collection.rawCollection.name)

		// apply history to memoryDb document(s)
		const insertedDocumentIds = new Set()
		for (const doc of documents.fetch()) {
			console.log('--- doc._id', doc._id, doc.createdAt)

			if (!doc?.createdAt || doc?.createdAt > replayDate) return undefined

			console.log('* survived:', doc._id)

			// insert document
			// TODO ensure already inserted documents don't cause an error
			const insertResult = await memoryCollection?.insertOne(doc as any)
			if (insertResult?.insertedId) insertedDocumentIds.add(insertResult?.insertedId)

			// apply all modifications
			const relevantSortedModifyHistory =
				doc.modifierHistory
					?.filter(mod => mod.timestamp <= replayDate)
					?.sort(
						(mod_a, mod_b) => +new Date(mod_a.timestamp) - +new Date(mod_b.timestamp)
					) || []

			for (const mod of relevantSortedModifyHistory) {
				console.log('updating doc', doc._id)
				await memoryCollection?.updateOne({ _id: doc._id }, mod.update as any)
			}
		}

		/*
		Exception from sub tasksPublicationM98dc1 id bSJ4ETQD6dDa7rGt9 Error: Publish function can only return a Cursor or an array of Cursors
		at Subscription._publishHandlerResult (packages/ddp-server/livedata_server.js:1206:18)
		at Subscription._runHandler (packages/ddp-server/livedata_server.js:1136:12)
		at Session._startSubscription (packages/ddp-server/livedata_server.js:917:9)
		at Session.sub (packages/ddp-server/livedata_server.js:673:12)
		at packages/ddp-server/livedata_server.js:603:43
		*/
		// TODO FIXME next: how to use Meteor's Mongo stuff to do all of this?
		const memoryDocuments = await memoryCollection?.find({ _id: { $in: insertedDocumentIds } })

		return memoryDocuments
	} else {
		return await collection.find(selector, options)
	}
}

export async function findOne<DocType>({
	collection,
	selector = {},
	options = {},
	replayDate,
}: CollectionFindParams<DocType>) {
	console.log('replayDate findOne', replayDate)
	return (await collection.findOne(selector, options)) as DocType | undefined
}
