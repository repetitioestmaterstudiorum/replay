import type { Mongo } from 'meteor/mongo'
import type { Collection, ReplayCollection } from '/imports/api/db/db.utils'

// ---

export type FindParams<DocType> = {
	selector?: Mongo.Selector<DbDocType<DocType>>
	options?: Mongo.Options<DbDocType<DocType>>
	replayDate?: Date
}

export type FindOneParams<DocType> = {
	_id: string
	options?: Mongo.Options<DbDocType<DocType>>
	replayDate?: Date
}

export type CollectionParams<DocType> = {
	collection: Collection<DocType>
	replayCollection: ReplayCollection<DocType>
}

export type DbDocType<DocType> = DocType & MetaDbFields

type DbDocTypeReplay<DocType> = DocType & MetaDbFields & ReplayDbFields<DocType>

type MetaDbFields = {
	_id: string
	createdAt: Date
	updatedAt: Date
}

type ReplayDbFields<DocType> = {
	initialInsert?: DocType & MetaDbFields
	updateHistory?: DbDocUpdate<DocType & MetaDbFields>[]
}

type DbDocUpdate<DocType> = {
	timestamp: Date
	update: Mongo.Modifier<DocType>
}
