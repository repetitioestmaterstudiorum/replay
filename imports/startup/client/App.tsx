import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router } from '/imports/startup/client/Router'

// ---

export function App() {
	const logout = () => Meteor.logout()

	return (
		<>
			<Router />
			<div
				className="user"
				onClick={logout}
				style={{ cursor: 'pointer', position: 'absolute', bottom: '10px' }}
			>
				🚪 logout "{Meteor.user()?.username}"
			</div>
		</>
	)
}
