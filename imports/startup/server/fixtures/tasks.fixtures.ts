import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import { insertTask } from '/imports/api/collections/tasks/tasks.mutations'
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
		].forEach(t => insertTask({ userId, text: t }))
	}
})
