import { Mongo } from 'meteor/mongo'
import { IndexOptions } from 'mongodb'
import _ from 'lodash'
import { log } from '/imports/api/utils/log'

// ---

export async function ensureIndexes<T>(collection: Mongo.Collection<T>, collectionName: string) {
	if (Meteor.isServer) {
		const C = (await import('/imports/startup/server/server-constants')).C

		type Index = IndexOptions & { key: Record<string, number> }

		try {
			const indexes: Index[] = _.get(C, `collections.${collectionName}.idxs`)

			log({ text: `Creating indexes for collection '${collectionName}'`, data: indexes })

			await collection.rawCollection().createIndexes(indexes)
		} catch (e) {
			log({
				text: `Error creating indexes for collection '${collectionName}'. Perhaps an index on one of the key properties (fields) already exists?`,
				data: e,
				severity: 'error',
			})
		}
	}
}
