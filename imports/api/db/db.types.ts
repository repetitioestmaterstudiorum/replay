import type { Mongo } from 'meteor/mongo'
import type { Collection, ReplayCollection } from '/imports/api/db/db.utils'

// ---

export type FindParams<DocType> = {
	selector?: Mongo.Selector<DocWithDbFields<DocType>>
	options?: Mongo.Options<DocWithDbFields<DocType>>
	replayDate?: Date
}

export type CollectionParams<DocType> = {
	collection: Collection<DocType>
	replayCollection: ReplayCollection<DocType>
}

export type DocWithDbFields<DocType> = DocType & DefaultDbFields<DocType>

type DefaultDbFields<DocType> = MetaDbFields & ReplayDbFields<DocType>

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
