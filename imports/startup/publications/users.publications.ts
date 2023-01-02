import { Meteor } from 'meteor/meteor'
import { findOneUser } from '/imports/api/collections/users/users.getters'

// ---

Meteor.publish('user', async function () {
	if (this.userId) {
		return await findOneUser({
			_id: this.userId,
			options: {
				fields: { uiState: 1 },
			},
		})
	} else {
		this.ready()
	}
})
