import { createMethod } from 'meteor/zodern:relay'
import { z } from 'zod'
import { updateTask } from '/imports/api/collections/tasks/tasks.mutations'
import { checkUsersTask } from '/imports/startup/meteor-methods/auth'

// ---

export const deleteTaskMM = createMethod({
	stub: true,
	schema: z.object({
		taskId: z.string(),
	}),
	async run({ taskId }) {
		checkUsersTask(taskId)

		return await updateTask(taskId, { $set: { isDeleted: true } })
	},
})
