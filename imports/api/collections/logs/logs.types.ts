import { z } from 'zod'
import type { DefaultDbFields } from '/imports/api/db/db.types'
import { logSchema } from '/imports/api/collections/logs/logs.collection'

// ---

export type Log = z.infer<typeof logSchema> & DefaultDbFields
