import { Meteor } from 'meteor/meteor'
import { z } from 'zod'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'

// ---

export function checkLoggedIn() {
	const userId = Meteor.userId()
	if (!userId) throw new Error('Not authorized.')
	return userId
}

export function checkUsersTask(taskId: string) {
	const userId = checkLoggedIn()
	z.string().parse(taskId)

	// TODO replace with general find function
	const isUsersTask = !!TasksCollection.findOne({ _id: taskId, userId }, { fields: { _id: 1 } })
	if (!isUsersTask) throw new Error('Access denied.')
}
