import { Mongo } from 'meteor/mongo'
import type { Task } from '/imports/api/collections/tasks/tasks.types'
import { z } from 'zod'
import { ensureIndexes } from '/imports/api/db/ensure-indexes'

// ---

export const TasksCollection = new Mongo.Collection<Task>('tasks')

ensureIndexes(TasksCollection, 'tasks')

export const tasksSchema = z.object({
	userId: z.string(),
	text: z.string(),
	isChecked: z.boolean(),
	isDeleted: z.boolean(),
})
