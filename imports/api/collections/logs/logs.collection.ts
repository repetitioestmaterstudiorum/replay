import { Mongo } from 'meteor/mongo'
import { Log } from '/imports/api/logs/logs.types'
import { z } from 'zod'
import { C } from '/imports/startup/iso-constants'

// ---

export const LogsCollection = new Mongo.Collection<Log>('logs')

C.collections.logs.idxs.forEach(idx => LogsCollection.createIndex(idx.key, idx.options))

export const logsSchema = z.object({
	text: z.string(),
	data: z.any(),
	severity: z.enum(['info', 'error']),
	timestamp: z.date(), // time of log function call, unlike createdAt
	env: z.string(),
	hostname: z.string(),
})
