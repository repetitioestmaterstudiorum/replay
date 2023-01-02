// import { findTasks } from '/imports/api/collections/tasks/tasks.getters'
// import { findOneUser } from '/imports/api/collections/users/users.getters'

// // ---

// Meteor.publish('tasks', async function () {
// 	const userId = this.userId

// 	if (userId) {
// 		const replayDate = (await findOneUser({ _id: userId }))?.uiState?.replayDate

// 		console.log('replayDate publish', replayDate)

// 		const selector = {
// 			userId: userId,
// 			isDeleted: { $ne: true },
// 		}
// 		const tasks = await findTasks({ selector, replayDate })

// 		console.log('publication tasks?.count()', tasks?.count())
// 		console.log('first task', tasks.fetch?.()?.[0])
// 		return tasks
// 	} else {
// 		this.ready()
// 	}
// })
