import { z } from 'zod'
import { createReplayCollection } from '/imports/api/db/db.utils'

// ---

export const UsersCollection = Meteor.users

export const UsersReplayCollection = createReplayCollection<User>('usersReplay')

export type User = Meteor.User & z.infer<typeof userSchema>

export const userSchema = z.object({
	uiState: z
		.object({
			replayDate: z.date().optional(),
			hideDone: z.boolean().optional(),
		})
		.optional(),
})
