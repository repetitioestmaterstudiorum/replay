import type { Mongo } from 'meteor/mongo'

// ---

export type DefaultDbFields<DocType> = {
	_id: string
	// not really optional props (mandatory in all db docs) but this simplifies insert methods because dates should be created automatically elsewhere
	createdAt?: Date
	updatedAt?: Date
	initialInsert?: DocType // // first element: initial insert of doc
	modifierHistory?: Modifier<DocType>[] // rest of the elements: mongodb modifiers
}

type Modifier<DocType> = {
	timestamp: Date
	update: Mongo.Modifier<DocType>
}

export type FindParams<DocType> = {
	selector?: Mongo.Selector<DocType>
	options?: Mongo.Options<DocType>
	replayDate?: Date
}

export type CollectionFindParams<DocType> = {
	collection: Mongo.Collection<DocType>
} & FindParams<DocType>

export type DocumentsCursor<DocType> = Mongo.Cursor<DocType & DefaultDbFields<DocType>>
