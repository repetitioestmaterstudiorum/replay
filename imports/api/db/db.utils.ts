import { Mongo } from 'meteor/mongo'
import type { DocWithDbFields } from '/imports/api/db/db.types'

// ---

export function createCollection<DocType>(collectionName: string) {
	return new Mongo.Collection<DocWithOptionalDbFields<DocType>, DocWithDbFields<DocType>>(
		collectionName
	)
}

export type Collection<DocType> = any
// TODO this should soon work in TS
// export type Collection<DocType> = ReturnType<typeof createCollection<DocType>>

export async function createReplayCollection<DocType>(collectionName: string) {
	const { C } = await import('/imports/startup/server/server-constants')

	// the _driver argument is not Typed in Meteor's Mongo, but still works ... Found out on https://stackoverflow.com/questions/36353404/meteor-does-see-a-remote-mongodb-instance-with-mongointernals-remotecollectiondr
	return new Mongo.Collection<DocWithOptionalDbFields<DocType>, DocWithDbFields<DocType>>(
		collectionName,
		{
			// @ts-ignore
			_driver: C.memoryDb.db,
		}
	)
}

export type ReplayCollection<DocType> =
	| ReplayCollectionReturnType<DocType>
	| Awaited<ReplayCollectionReturnType<DocType>>

type ReplayCollectionReturnType<DocType> = any
// TODO this should soon work in TS
// type ReplayCollectionReturnType<DocType> = ReturnType<typeof createReplayCollection<DocType>>

type DocWithOptionalDbFields<DocType> = Partial<DocWithDbFields<DocType>>
