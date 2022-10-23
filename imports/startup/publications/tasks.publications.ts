import { createPublication } from 'meteor/zodern:relay'
import { z } from 'zod'
import { findTasks } from '/imports/api/collections/tasks/tasks.getters'

// ---

const replayDateSchema = z.object({ replayDate: z.date().optional() })

export const tasksPublication = createPublication({
	schema: replayDateSchema,
	async run({ replayDate }: z.infer<typeof replayDateSchema>) {
		if (this.userId) {
			const selector = {
				userId: this.userId,
				isDeleted: { $ne: true },
			}
			return await findTasks({ selector, replayDate })
		} else {
			this.ready()
		}
	},
})
