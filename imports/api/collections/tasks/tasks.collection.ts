import { Mongo } from 'meteor/mongo'
import { Task } from './tasks.types'
import { z } from 'zod'

// ---

export const TasksCollection = new Mongo.Collection<Task>('tasks')

export const tasksSchema = z.object({
	userId: z.string(),
	text: z.string(),
	isChecked: z.boolean(),
	isDeleted: z.boolean(),
})
