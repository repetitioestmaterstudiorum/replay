import { Meteor } from 'meteor/meteor'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'

// ---

Meteor.publish('tasks', function publishTasks() {
	if (this.userId) {
		return TasksCollection.find({ userId: this.userId, isDeleted: { $ne: true } })
	} else {
		this.ready()
	}
})
