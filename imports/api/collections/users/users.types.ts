import { z } from 'zod'
import { userSchema } from '/imports/api/collections/users/users.collection'

// ---

export type User = Meteor.User & z.infer<typeof userSchema>
