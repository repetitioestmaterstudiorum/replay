import { z } from 'zod'

// ---

export const userSchema = z.object({
	uiState: z
		.object({
			replayDate: z.date().optional(),
		})
		.optional(),
})

export type User = Meteor.User & z.infer<typeof userSchema>
