// import { createPublication } from 'meteor/zodern:relay'
import { z } from 'zod'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'

// ---

const tasksPublicationSchema = z.object({ replayDate: z.date().optional() })

// export const tasksPublication = createPublication({
// 	schema: replayDateSchema,
// 	async run({ replayDate }: z.infer<typeof replayDateSchema>) {
// 		if (this.userId) {
// 			const selector = {
// 				userId: this.userId,
// 				isDeleted: { $ne: true },
// 			}
// 			// const tasks = await findTasks({ selector, replayDate })
// 			// return tasks
// 			return await findTasks({ selector, replayDate })
// 		} else {
// 			this.ready()
// 		}
// 	},
// })

Meteor.publish('tasks', async function ({ replayDate }: z.infer<typeof tasksPublicationSchema>) {
	tasksPublicationSchema.parse({ replayDate })

	if (this.userId) {
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
