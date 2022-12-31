import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { Task, taskSchema } from '/imports/api/collections/tasks/tasks.collection'
import { insertTask, updateTask } from '/imports/api/collections/tasks/tasks.mutations'
import { checkUsersTask, checkLoggedIn } from '/imports/api/meteor-methods/auth'

// ---

Meteor.methods({
	addTaskMM: addTask,
	toggleTaskMM: toggleTask,
	removeTaskMM: removeTask,
})

async function addTask(text: Task['text']) {
	// TODO check if this returns if parse fails
	console.log('taskSchema.safeParse({ text })', taskSchema.safeParse({ text }))

	taskSchema.safeParse({ text })
	const userId = checkLoggedIn()

	return await insertTask({ userId, text })
}

async function toggleTask({ taskId, isChecked }: Pick<Task, 'isChecked'> & { taskId: string }) {
	check(taskId, String)
	taskSchema.safeParse({ isChecked })
	checkUsersTask(taskId)

	return await updateTask(taskId, { $set: { isChecked: !isChecked } })
}

async function removeTask(taskId: string) {
	check(taskId, String)
	checkUsersTask(taskId)

	return await updateTask(taskId, { $set: { isDeleted: true } })
}
