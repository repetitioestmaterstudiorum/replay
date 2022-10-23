import { createMethod } from 'meteor/zodern:relay'
import { z } from 'zod'
import { updateUser } from '/imports/api/collections/users/users.mutations'
import { checkLoggedIn } from '/imports/api/meteor-methods/auth'

// ---

export const setReplayDate = createMethod({
	stub: true,
	schema: z.object({
		replayDate: z.date().optional(),
	}),
	async run({ replayDate }) {
		const userId = checkLoggedIn()

		return await updateUser(userId, { $set: { 'uiState.replayDate': replayDate } })
	},
})
