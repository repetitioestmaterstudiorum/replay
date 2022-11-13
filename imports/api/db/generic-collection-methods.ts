import _ from 'lodash'
import { Mongo } from 'meteor/mongo'
import type { Collection } from '/imports/api/db/db.utils'
import type { CollectionParams, DocWithDbFields, FindParams } from '/imports/api/db/db.types'
import { log } from '/imports/api/utils/log'

// ---

export async function insert<DocType>(
	collection: Collection<DocType>,
	document: DocType,
	replayable: boolean | undefined = true
) {
	holyFieldsGuard(document)

	const timestamp = new Date()

	const documentWithMetaFields = _.assign(document, {
		_id: new Mongo.ObjectID().toHexString(),
		createdAt: timestamp,
		updatedAt: timestamp,
	})

	// prettier-ignore
	const finalDocument = replayable ? _.assign(documentWithMetaFields, {
				initialInsert: _.cloneDeep(documentWithMetaFields),
				updateHistory: [],
		  })
		: documentWithMetaFields

	// @ts-ignore
	return await collection.insert(finalDocument)
}

export async function update<DocType>(
	collection: Collection<DocType>,
	selector: Mongo.Selector<DocWithDbFields<DocType>>,
	update: Mongo.Modifier<DocType>,
	replayable: boolean | undefined = true
) {
	holyFieldsGuard(update)

	const timestamp = new Date()

	// perform actual update
	const updateWithMetadata = {
		..._.cloneDeep(update),
		$set: {
			..._.get(update, '$set'),
			updatedAt: timestamp,
		},
	}
	const updateResult = collection.update(selector, updateWithMetadata)

	if (Meteor.isServer && replayable) {
		// add update to updateHistory
		const replayUpdate = {
			$push: {
				..._.get(updateWithMetadata, '$push'),
				updateHistory: {
					timestamp,
					update: updateWithMetadata,
				},
			},
		}
		await collection.update(selector, replayUpdate)
	}

	return await updateResult
}

export async function find<DocType>({
	collection,
	replayCollection,
	selector = {},
	options = {},
	replayDate,
}: FindParams<DocType> & CollectionParams<DocType>) {
	if (replayDate && Meteor.isServer) {
		console.log('\nreplayDate server find:', replayDate)

		const { C } = await import('/imports/startup/server/server-constants')
		if (!C.memoryDb?.ready) return console.error(new Error('C.memoryDb.ready is false'))

		const documents = await collection.find(selector, options)

		const memoryCollection = await replayCollection

		// apply history to memoryDb document(s)
		const insertedDocumentIds = []
		for (const doc of documents.fetch()) {
			if (!doc?.createdAt || doc?.createdAt > replayDate) continue

			// delete existing document in memory if it exists
			if (await memoryCollection?.findOne(doc._id)) {
				// continue
				await memoryCollection?.remove(doc._id)
			}

			// insert document
			const insertedDocumentId = await memoryCollection?.insert(doc)
			insertedDocumentIds.push(insertedDocumentId)

			// apply all modifications
			const relevantSortedModifyHistory =
				doc.updateHistory
					?.filter(mod => mod.timestamp <= replayDate)
					?.sort(
						(mod_a, mod_b) => +new Date(mod_a.timestamp) - +new Date(mod_b.timestamp)
					) || []

			for (const mod of relevantSortedModifyHistory) {
				await memoryCollection?.update({ _id: doc._id }, mod.update)
			}
		}

		const memoryFound = await memoryCollection.find({ _id: { $in: insertedDocumentIds } })
		return memoryFound
	} else {
		const found = await collection.find(selector, options)
		return found
	}
}

// helpers

function holyFieldsGuard(docOrUpdate: any) {
	const holyFields = ['_id', 'createdAt', 'updatedAt', 'initialInsert', 'updateHistory']

	const protectedOperators = ['', '$set', '$push']

	const docOrUpdateContainsHolyField = protectedOperators.some(po =>
		holyFields.some(hf => _.get(docOrUpdate, po + hf))
	)

	if (docOrUpdateContainsHolyField) {
		const errMsg = 'docOrUpdate contains holy field!'
		log({ text: errMsg, data: docOrUpdate })
		throw new Error(errMsg)
	}
}
