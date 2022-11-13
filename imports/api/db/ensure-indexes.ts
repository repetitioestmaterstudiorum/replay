import { Mongo } from 'meteor/mongo'
import { CreateIndexesOptions } from 'mongodb'
import _ from 'lodash'
import { log } from '/imports/api/utils/log'

// ---

export async function ensureIndexes<T>(collection: Mongo.Collection<T>, collectionName: string) {
	if (Meteor.isServer) {
		type Index = CreateIndexesOptions & { key: Record<string, number> }
		const { C } = await import('/imports/startup/server/server-constants')
		const createIndexes: Index[] = _.get(C, `collections.${collectionName}.idxs`) || []

		try {
			const existingIndexes = await collection.rawCollection().indexes()
			const existingIndexNames = new Set(existingIndexes.map(idx => Object.keys(idx.key)[0]))

			for (const index of createIndexes) {
				const fieldName = Object.keys(index.key)[0]
				if (existingIndexNames.has(fieldName)) {
					log({
						text: `Index on field ${fieldName} already exists, collection '${collectionName}'`,
					})
				} else {
					try {
						log({
							text: `Applying index for field ${fieldName}, collection '${collectionName}'`,
							data: index,
						})
						collection.createIndex(index.key, _.omit(index, ['key']))
					} catch (e) {
						log({
							text: `Error applying index for field ${fieldName}, collection '${collectionName}'`,
							data: e,
							severity: 'error',
						})
					}
				}
			}
		} catch (e) {
			console.error('Indexes could not be ensured. Perhaps the collection did not exist yet')
			console.error(e)
		}
	}
}
