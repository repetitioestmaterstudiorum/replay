import { Meteor } from 'meteor/meteor'
import { C } from '/imports/startup/server/server-constants'

// ---

// import all fixtures, publications, and meteor methods
import '/imports/startup/server/fixtures/all-fixtures'
import '/imports/startup/publications/all-publications'
import '/imports/api/meteor-methods/all-meteor-methods'

Meteor.startup(async () => {
	// initiate the memory db for replayability
	await C.memoryDb?.init()

	// ensure there's an admin user
	if (!Accounts.findUserByUsername(C.defaultAdmin.username)) {
		Accounts.createUser({
			username: C.defaultAdmin.username,
			password: C.defaultAdmin.password,
		})
	}
})
