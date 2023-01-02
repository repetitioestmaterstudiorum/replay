import { Meteor } from 'meteor/meteor'
import { z } from 'zod'
import { partialTaskSchema } from '/imports/api/collections/tasks/tasks.collection'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'
import { insertTask, updateTask } from '/imports/api/collections/tasks/tasks.mutations'
import { checkUsersTask, checkLoggedIn } from '/imports/api/meteor-methods/auth'
import { parseSchema } from '/imports/api/utils/data-validation'
import type { Mongo } from 'meteor/mongo'
import type { DbDocType } from '/imports/api/db/db.types'
import type { Task } from '/imports/api/collections/tasks/tasks.collection'

// ---

Meteor.methods({
	getCurrentTasksMM: getCurrentTasks,
	addTaskMM: addTask,
	toggleTaskMM: toggleTask,
	removeTaskMM: removeTask,
})

async function getCurrentTasks({ hideDone, replayDate }: GetCurrentTasksArgs) {
	return await getTasks({ isDeleted: false, hideDone }, replayDate)
}

export type GetCurrentTasksArgs = {
	hideDone?: boolean
	replayDate?: Date
}

async function getTasks(query: Mongo.Selector<DbDocType<Task>>, replayDate: Date | undefined) {
	if (Meteor.isClient) return
	const userId = checkLoggedIn()

	const selector = { ...query, userId }

	const tasksCursor = await findTasks({ selector, replayDate })

	return tasksCursor?.fetch()
}

async function addTask(text: Task['text']) {
	if (Meteor.isClient) return

	parseSchema(partialTaskSchema, { text })

	const userId = checkLoggedIn()

	const taskInsertedSuccessfully = await insertTask({ userId, text })
	return taskInsertedSuccessfully
}

async function toggleTask({ taskId, isChecked }: Pick<Task, 'isChecked'> & { taskId: string }) {
	if (Meteor.isClient) return

	parseSchema(partialTaskSchema, { taskId, isChecked })

	checkUsersTask(taskId)

	return await updateTask(taskId, { $set: { isChecked: !isChecked } })
}

async function removeTask(taskId: string) {
	if (Meteor.isClient) return

	z.string().parse(taskId)

	checkUsersTask(taskId)

	return await updateTask(taskId, { $set: { isDeleted: true } })
}
