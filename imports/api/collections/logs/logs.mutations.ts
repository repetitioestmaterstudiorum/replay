import { insert } from '/imports/api/db/generic-collection-methods'
import { LogsCollection } from '/imports/api/collections/logs/logs.collection'
import type { Log } from '/imports/api/collections/logs/logs.collection'

// ---

export async function insertLog(log: Log) {
	// updateHistory and initialInsert are deactivated for this collection
	return await insert<Log>(LogsCollection, log, false)
}
