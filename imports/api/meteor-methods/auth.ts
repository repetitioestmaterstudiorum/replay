import { Meteor } from 'meteor/meteor'
import { z } from 'zod'
import { findOne } from '/imports/api/collections/generic-collection-helpers'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import type { Task } from '/imports/api/collections/tasks/tasks.types'

// ---

export function checkLoggedIn() {
	const userId = Meteor.userId()
	if (!userId) throw new Error('Not authorized.')
	return userId
}

export async function checkUsersTask(taskId: string) {
	const userId = checkLoggedIn()
	z.string().parse(taskId)

	const isUsersTask = await findOne<Task>(
		TasksCollection,
		{ _id: taskId, userId },
		{ fields: { _id: 1 } }
	)
	if (!isUsersTask) throw new Error('Access denied.')
}
