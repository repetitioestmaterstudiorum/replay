import type { User } from '/imports/api/collections/users/users.types'

// ---

export async function updateUser(userId: string, modifier: Mongo.Modifier<User>) {
	return await Meteor.users.update({ _id: userId }, modifier)
}
