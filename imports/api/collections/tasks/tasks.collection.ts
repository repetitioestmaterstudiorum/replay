import { ensureIndexes } from '/imports/api/db/ensure-indexes'
import { createCollection, createReplayCollection } from '/imports/api/db/db.utils'
import { z } from 'zod'
import { DbDocType } from '/imports/api/db/db.types'

// ---

export const TasksCollection = createCollection<Task>('tasks')

ensureIndexes(TasksCollection, 'tasks')

export const TasksReplayCollection = createReplayCollection<Task>('tasksReplay')

export type Task = z.infer<typeof taskSchema>

export type DbTask = DbDocType<Task>

export const taskSchema = z.object({
	userId: z.string(),
	text: z.string(),
	isChecked: z.boolean(),
	isDeleted: z.boolean(),
})

export const partialTaskSchema = taskSchema.partial()
