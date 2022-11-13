import { ensureIndexes } from '/imports/api/db/ensure-indexes'
import { createCollection, createReplayCollection } from '/imports/api/db/db.utils'
import { z } from 'zod'

// ---

export const TasksCollection = createCollection<Task>('tasks')

ensureIndexes(TasksCollection, 'tasks')

export const TasksReplayCollection = Meteor.isClient
	? createCollection<Task>('tasksReplay')
	: createReplayCollection<Task>('tasksReplay')

export type Task = z.infer<typeof taskSchema>

export const taskSchema = z.object({
	userId: z.string(),
	text: z.string(),
	isChecked: z.boolean(),
	isDeleted: z.boolean(),
})
