import { z } from 'zod'
import type { DefaultDbFields } from '/imports/api/db/db.types'
import { taskSchema } from '/imports/api/collections/tasks/tasks.collection'

// ---

type TaskDocType = z.infer<typeof taskSchema>

export type Task = TaskDocType & DefaultDbFields<TaskDocType>
