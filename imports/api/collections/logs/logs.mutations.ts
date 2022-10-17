import { insert } from '/imports/api/db/generic-collection-methods'
import { LogsCollection } from '/imports/api/collections/logs/logs.collection'
import type { Log } from '/imports/api/collections/logs/logs.types'

// ---

export async function insertLog(log: Log) {
	return await insert<Log>(LogsCollection, log)
}
