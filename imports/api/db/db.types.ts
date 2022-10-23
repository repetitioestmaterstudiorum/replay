export type DefaultDbFields = {
	_id: string
	// not really optional props (mandatory in all db docs) but this simplifies insert methods because dates should be created automatically elsewhere
	createdAt?: Date
	updatedAt?: Date
}

export type FindParams<DocType> = {
	selector: Mongo.Selector<DocType>
	options?: Mongo.Options<DocType>
	replayDate?: Date
}

export type CollectionFindParams<DocType> = {
	collection: Mongo.Collection<DocType>
} & FindParams<DocType>
