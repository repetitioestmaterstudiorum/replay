import { Mongo } from 'meteor/mongo'
import { CreateIndexesOptions } from 'mongodb'
import _ from 'lodash'
import { log } from '/imports/api/utils/log'

// ---

export async function ensureIndexes<T>(collection: Mongo.Collection<T>, collectionName: string) {
	if (Meteor.isServer) {
		const C = (await import('/imports/startup/server/server-constants')).C

		type Index = CreateIndexesOptions & { key: Record<string, number> }

		const createIndexes: Index[] = _.get(C, `collections.${collectionName}.idxs`)
		const existingIndexes = new Set(
			(await collection.rawCollection().indexes())?.map(idx => Object.keys(idx.key)[0])
		)

		for (const index of createIndexes) {
			const fieldName = Object.keys(index.key)[0]
			if (existingIndexes.has(fieldName)) {
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
	}
}
