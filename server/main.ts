import { Meteor } from 'meteor/meteor'
import { C } from '/imports/startup/server/server-constants'

// ---

// import all fixtures, publications, and methods
import '/imports/startup/server/fixtures/all-fixtures'
import '/imports/startup/publications/all-publications'
import '/imports/api/meteor-methods/all-meteor-methods'

Meteor.startup(async () => {
	if (!Accounts.findUserByUsername(C.defaultAdmin.username)) {
		Accounts.createUser({
			username: C.defaultAdmin.username,
			password: C.defaultAdmin.password,
		})
	}
})
