import { insert, update } from '/imports/api/db/generic-collection-methods'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import type { Task } from '/imports/api/collections/tasks/tasks.collection'
import { Mongo } from 'meteor/mongo'

// ---

export async function insertTask({ userId, text }: Pick<Task, 'userId' | 'text'>) {
	return await insert<Task>(TasksCollection, {
		userId,
		text,
		isChecked: false,
		isDeleted: false,
	})
}

export async function updateTask(taskId: string, modifier: Mongo.Modifier<Task>) {
	return await update<Task>(TasksCollection, { _id: taskId }, modifier)
}
