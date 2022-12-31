import {
	User,
	UsersCollection,
	UsersReplayCollection,
} from '/imports/api/collections/users/users.collection'
import { FindOneParams, FindParams } from '/imports/api/db/db.types'
import { find } from '/imports/api/db/generic-collection-methods'

// ---

export async function findUsers({ selector, options }: FindParams<User> = {}) {
	return find<User>({
		collection: UsersCollection,
		replayCollection: UsersReplayCollection,
		selector,
		options,
		replayDate: undefined,
	})
}

export async function findOneUser({ _id, options }: FindOneParams<User>) {
	const usersCursor = await findUsers({ selector: { _id }, options })
	const usersCount = usersCursor.count()
	if (usersCount === 1) {
		return usersCursor.fetch()[0]
	} else {
		return undefined
	}
}
