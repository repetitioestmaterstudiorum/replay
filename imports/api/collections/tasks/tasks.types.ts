import { z } from 'zod'
import type { DefaultDbFields } from '/imports/api/db/db.types'
import { taskSchema } from '/imports/api/collections/tasks/tasks.collection'

// ---

export type Task = z.infer<typeof taskSchema> & DefaultDbFields
