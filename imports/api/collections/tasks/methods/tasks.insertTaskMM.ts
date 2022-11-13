import { createMethod } from 'meteor/zodern:relay'
import { checkLoggedIn } from '/imports/api/meteor-methods/auth'
import { insertTask } from '/imports/api/collections/tasks/tasks.mutations'
import { taskSchema } from '/imports/api/collections/tasks/tasks.collection'

// ---

export const insertTaskMM = createMethod({
	stub: true,
	schema: taskSchema.pick({ text: true }),
	async run({ text }) {
		const userId = checkLoggedIn()

		return await insertTask({ userId, text })
	},
})
