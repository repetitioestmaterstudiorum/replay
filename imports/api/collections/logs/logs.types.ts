import { z } from 'zod'
import { DefaultDbFields } from '/imports/api/db/db.types'
import { logsSchema } from '/imports/api/logs/logs.collection'

// ---

export type Log = z.infer<typeof logsSchema> & DefaultDbFields
