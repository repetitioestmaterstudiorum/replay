import { Mongo } from 'meteor/mongo'
import { Log } from '/imports/api/collections/logs/logs.types'
import { z } from 'zod'
import { ensureIndexes } from '../../db/ensure-indexes'

// ---

export const LogsCollection = new Mongo.Collection<Log>('logs')

ensureIndexes(LogsCollection, 'logs')

export const logsSchema = z.object({
	text: z.string(),
	data: z.any(),
	severity: z.enum(['info', 'error']),
	timestamp: z.date(), // time of log function call, unlike createdAt
	env: z.string(),
	hostname: z.string(),
})
