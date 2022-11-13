import { createMethod } from 'meteor/zodern:relay'
import { z } from 'zod'
import { updateTask } from '/imports/api/collections/tasks/tasks.mutations'
import { checkUsersTask } from '/imports/api/meteor-methods/auth'

// ---

export const deleteTaskMM = createMethod({
	stub: true,
	schema: z.object({
		taskId: z.string(),
	}),
	async run({ taskId }: { taskId: string }) {
		checkUsersTask(taskId)

		return await updateTask(taskId, { $set: { isDeleted: true } })
	},
})
