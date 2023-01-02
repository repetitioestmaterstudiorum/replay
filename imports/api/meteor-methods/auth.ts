import { Meteor } from 'meteor/meteor'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'

// ---

export function checkLoggedIn() {
	const userId = Meteor.userId()
	if (!userId) throw new Error('Not authorized.')
	return userId
}

export async function checkUsersTask(taskId: string) {
	const userId = checkLoggedIn()

	const isUsersTask =
		(
			await findTasks({
				selector: { _id: taskId, userId },
				options: { fields: { _id: 1 } },
			})
		).count() === 1

	if (!isUsersTask) throw new Error('Access denied.')
}
