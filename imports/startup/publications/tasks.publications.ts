import { createPublication } from 'meteor/zodern:relay'
import { z } from 'zod'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'

// ---

export const tasksPublication = createPublication({
	schema: z.any(),
	run() {
		if (this.userId) {
			return TasksCollection.find({ userId: this.userId, isDeleted: { $ne: true } })
		} else {
			this.ready()
		}
	},
})
