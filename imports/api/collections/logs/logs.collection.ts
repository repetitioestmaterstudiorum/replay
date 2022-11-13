import { createCollection } from '/imports/api/db/db.utils'
import { ensureIndexes } from '/imports/api/db/ensure-indexes'
import { z } from 'zod'

// ---

export const LogsCollection = createCollection<Log>('logs')

ensureIndexes(LogsCollection, 'logs')

export type Log = z.infer<typeof logSchema>

export const logSchema = z.object({
	text: z.string(),
	data: z.any(),
	severity: z.enum(['info', 'error']),
	timestamp: z.date(), // time of log function call, unlike createdAt
	env: z.string(),
	hostname: z.string(),
})
