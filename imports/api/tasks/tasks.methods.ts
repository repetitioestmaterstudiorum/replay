import { TasksCollection } from '/imports/api/tasks/tasks.collection'
import { Task } from '/imports/api/tasks/tasks.types'

// ---

export function insertTask(text: string, userId: string) {
	TasksCollection.insert({
		_id: `${Math.random() * 1000 + Date.now()}`,
		userId,
		text,
		createdAt: new Date(),
		isChecked: false,
		isDeleted: false,
	})
}

export function deleteTask(taskId: Task['_id']) {
	updateTask(taskId, { $set: { isDeleted: true } })
}

export function taskToggleChecked(task: Task) {
	updateTask(task._id, { $set: { isChecked: !task.isChecked } })
}

function updateTask(taskId: Task['_id'], modifier: Mongo.Modifier<Task>) {
	TasksCollection.update({ _id: taskId }, modifier)
}
