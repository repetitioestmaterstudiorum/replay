import { insert, update } from '/imports/api/collections/generic-collection-helpers'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import type { Task } from '/imports/api/collections/tasks/tasks.types'

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
