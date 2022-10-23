import { createMethod } from 'meteor/zodern:relay'
import { z } from 'zod'
import { updateUser } from '/imports/api/collections/users/users.mutations'
import { checkLoggedIn } from '/imports/api/meteor-methods/auth'

// ---

export const unsetReplayDate = createMethod({
	stub: true,
	schema: z.any(),
	async run() {
		const userId = checkLoggedIn()

		return await updateUser(userId, { $unset: { 'uiState.replayDate': true } })
	},
})
