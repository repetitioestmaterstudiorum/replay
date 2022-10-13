import { Meteor } from 'meteor/meteor'
import { C } from '/imports/startup/server/server-constants'

// ---

// import all publications, methods, and fixtures
import '/imports/api/publications'
import '/imports/api/meteor-methods'
import '/imports/api/fixtures'

Meteor.startup(async () => {
	console.info('--- startup server')

	if (!Accounts.findUserByUsername(C.defaultAdmin.username)) {
		Accounts.createUser({
			username: C.defaultAdmin.username,
			password: C.defaultAdmin.password,
		})
	}
})
