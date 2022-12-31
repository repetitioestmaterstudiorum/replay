import { Tracker } from 'meteor/tracker'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'
import { findOneUser } from '/imports/api/collections/users/users.getters'

// ---

Meteor.publish('tasks', async function () {
	Tracker.autorun(() => {
		if (this.userId) {
			const replayDate = (await findOneUser({ _id: this.userId }))?.uiState?.replayDate

			console.log('replayDate publish', replayDate)

			const selector = {
				userId: this.userId,
				isDeleted: { $ne: true },
			}
			const tasks = await findTasks({ selector, replayDate })
			console.log('publication tasks?.count()', tasks?.count())
			return tasks
			// return await findTasks({ selector, replayDate })
		} else {
			this.ready()
		}
	})
})
