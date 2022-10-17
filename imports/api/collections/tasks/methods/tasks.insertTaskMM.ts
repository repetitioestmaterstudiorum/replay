import { createMethod } from 'meteor/zodern:relay'
import { checkLoggedIn } from '/imports/api/meteor-methods/auth'
import { tasksSchema } from '/imports/api/collections/tasks/tasks.collection'
import { insertTask } from '/imports/api/collections/tasks/tasks.mutations'

// ---

export const insertTaskMM = createMethod({
	stub: true,
	schema: tasksSchema.pick({ text: true }),
	async run({ text }) {
		const userId = checkLoggedIn()

		return await insertTask({ userId, text })
	},
})
