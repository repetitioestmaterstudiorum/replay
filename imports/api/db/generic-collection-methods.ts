import { Mongo } from 'meteor/mongo'

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

export async function find<DocType>(
	collection: Mongo.Collection<DocType>,
	selector: Mongo.Selector<DocType>,
	options?: Mongo.Options<DocType>
) {
	return (await collection.find(selector, options)) as Mongo.Cursor<DocType, DocType>
}

export async function findOne<DocType>(
	collection: Mongo.Collection<DocType>,
	selector: Mongo.Selector<DocType>,
	options?: Mongo.Options<DocType>
) {
	return (await collection.findOne(selector, options)) as DocType | undefined
}
