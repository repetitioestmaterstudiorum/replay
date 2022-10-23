import { Meteor } from 'meteor/meteor'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'
import { insertTask } from '/imports/api/collections/tasks/tasks.mutations'
import { C } from '/imports/startup/server/server-constants'

// ---

Meteor.startup(async () => {
	if ((await findTasks()).count() === 0) {
		const userId = Meteor.users.findOne({ username: C.defaultAdmin.username })?._id
		if (!userId) {
			return console.error('no C.defaultAdmin.username id found ')
		}

		;[
			'First Task',
			'Second Task',
			'Third Task',
			'Fourth Task',
			'Fifth Task',
			'Sixth Task',
			'Seventh Task',
		].forEach(t => insertTask({ userId, text: t }))
	}
})
