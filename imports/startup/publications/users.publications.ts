import { Meteor } from 'meteor/meteor'

// ---

Meteor.publish('user', async function () {
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
})
