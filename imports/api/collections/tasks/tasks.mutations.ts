import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import type { Task } from '/imports/api/collections/tasks/tasks.types'

// ---

export async function insertTask({ userId, text }: Pick<Task, 'userId' | 'text'>) {
	// TODO use generic insert method
	const insertedDocId = await TasksCollection.insert({
		userId,
		text,
		isChecked: false,
		isDeleted: false,
	})
	return insertedDocId
}

export async function updateTask(taskId: string, modifier: Mongo.Modifier<Task>) {
	// TODO replace with general update method
	return await TasksCollection.update({ _id: taskId }, modifier)
}
