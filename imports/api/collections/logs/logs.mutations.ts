import { LogsCollection } from '/imports/api/collections/logs/logs.collection'
import { Log } from '/imports/api/collections/logs/logs.types'

// ---

export async function insertLog(log: Log) {
	// TODO replace with general insert method
	return await LogsCollection.insert(log)
}
