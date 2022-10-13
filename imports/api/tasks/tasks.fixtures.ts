import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'
import { insertTask } from '/imports/api/tasks/tasks.methods'
import { C } from '/imports/startup/server/server-constants'

// ---

Meteor.startup(() => {
	if (TasksCollection.find().count() === 0) {
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
		].forEach(t => insertTask(t, userId))
	}
})
