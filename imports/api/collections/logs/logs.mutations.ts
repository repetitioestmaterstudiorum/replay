import { insert } from '/imports/api/collections/generic-collection-helpers'
import { LogsCollection } from '/imports/api/collections/logs/logs.collection'
import { Log } from '/imports/api/collections/logs/logs.types'

// ---

export async function insertLog(log: Log) {
	return await insert<Log>(LogsCollection, log)
}
