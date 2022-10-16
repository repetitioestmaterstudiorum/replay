import { z } from 'zod'
import { DefaultDbFields } from '/imports/api/db/db.types'
import { tasksSchema } from './tasks.collection'

// ---

export type Task = z.infer<typeof tasksSchema> & DefaultDbFields
