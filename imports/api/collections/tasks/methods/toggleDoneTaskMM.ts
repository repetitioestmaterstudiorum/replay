import { createMethod } from 'meteor/zodern:relay'
import { z } from 'zod'
import { checkUsersTask } from '/imports/api/meteor-methods/auth'
import { updateTask } from '/imports/api/collections/tasks/tasks.mutations'

// ---

export const toggleDoneTaskMM = createMethod({
	stub: true,
	schema: z.object({
		taskId: z.string(),
		isChecked: z.boolean(),
	}),
	async run({ taskId, isChecked }) {
		checkUsersTask(taskId)

		return await updateTask(taskId, { $set: { isChecked: !isChecked } })
	},
})
