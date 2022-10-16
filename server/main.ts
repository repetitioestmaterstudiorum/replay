import { Meteor } from 'meteor/meteor'
import { C } from '/imports/startup/server/server-constants'

// ---

// import all fixtures, publications, and methods
import '/imports/startup/server/fixtures/fixtures'
import '/imports/startup/server/publications/publications'
import '/imports/startup/meteor-methods/all-meteor-methods'

Meteor.startup(async () => {
	if (!Accounts.findUserByUsername(C.defaultAdmin.username)) {
		Accounts.createUser({
			username: C.defaultAdmin.username,
			password: C.defaultAdmin.password,
		})
	}
})
