import { createPublication } from 'meteor/zodern:relay'
import { z } from 'zod'

// ---

export const usersPublication = createPublication({
	schema: z.any(),
	async run() {
		if (this.userId) {
			return await Meteor.users.find(
				{ _id: this.userId },
				{
					fields: { 'uiState.replayDate': 1 },
				}
			)
		} else {
			this.ready()
		}
	},
})
