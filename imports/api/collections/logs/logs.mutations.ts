import { createMethod } from 'meteor/zodern:relay'
import { LogsCollection, logsSchema } from '/imports/api/logs/logs.collection'

// ---

export const insertLog = createMethod({
	name: 'insertLog',
	schema: logsSchema,
	async run(log) {
		// TODO replace with general insert method
		return await LogsCollection.insert(log)
	},
})
