import { Meteor } from 'meteor/meteor'
import { C } from '/imports/startup/server/server-constants'

// ---

// import all publications, methods, and fixtures
import '/imports/startup/server/publications/publications'
import '/imports/startup/server/methods/server-methods'
import '/imports/startup/server/fixtures/fixtures'

Meteor.startup(async () => {
	console.info('--- startup server')

	if (!Accounts.findUserByUsername(C.defaultAdmin.username)) {
		Accounts.createUser({
			username: C.defaultAdmin.username,
			password: C.defaultAdmin.password,
		})
	}
})
