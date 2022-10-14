import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { App } from '/imports/startup/client/App'

// ---

// methods to run on the client as well
import '/imports/startup/client/methods/client-methods'

Meteor.startup(() => {
	render(<App />, document.getElementById('react-target'))
})
