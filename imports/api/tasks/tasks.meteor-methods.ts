import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { deleteTask, insertTask, taskToggleChecked } from '/imports/api/tasks/tasks.methods'
import { Task } from '/imports/api/tasks/tasks.types'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'

// ---

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String)

		throwIfNotLoggedIn(this.userId)

		insertTask(text, this.userId as string)
	},

	'tasks.delete'(taskId) {
		check(taskId, String)

		throwIfNotUsersTask(this.userId, taskId)

		deleteTask(taskId)
	},

	'tasks.toggleChecked'(task: Task) {
		check(task._id, String) // TODO check entire Task type with Zod

		throwIfNotUsersTask(this.userId, task._id)

		taskToggleChecked(task)
	},
})

function throwIfNotLoggedIn(userId: string | null) {
	if (!userId) throw new Meteor.Error('Not authorized.')
}

function throwIfNotUsersTask(userId: string | null, taskId: Task['_id']) {
	throwIfNotLoggedIn(userId)

	const isUsersTask = !!TasksCollection.findOne(
		{ _id: taskId, userId: userId as string },
		{ fields: { _id: 1 } }
	)
	if (!isUsersTask) throw new Meteor.Error('Access denied.')
}
