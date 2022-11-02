import { Mongo } from 'meteor/mongo'
import type { CollectionFindParams } from '/imports/api/db/db.types'

// ---

export async function insert<DocType>(
	collection: Mongo.Collection<DocType>,
	data: UnionOmit<DocType, '_id'>
) {
	return await collection.insert(data)
}

export async function update<DocType>(
	collection: Mongo.Collection<DocType>,
	selector: Mongo.Selector<DocType>,
	modifier: Mongo.Modifier<DocType>
) {
	return await collection.update(selector, modifier)
}

export async function find<DocType>({
	collection,
	selector = {},
	options = {},
	replayDate,
}: CollectionFindParams<DocType>) {
	console.log('replayDate find', replayDate)
	return (await collection.find(selector, options)) as Mongo.Cursor<DocType, DocType>
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
