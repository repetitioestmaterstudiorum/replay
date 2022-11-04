import { z } from 'zod'
import type { DefaultDbFields } from '/imports/api/db/db.types'
import { logSchema } from '/imports/api/collections/logs/logs.collection'

// ---

type LogDocType = z.infer<typeof logSchema>

export type Log = LogDocType & DefaultDbFields<LogDocType>
