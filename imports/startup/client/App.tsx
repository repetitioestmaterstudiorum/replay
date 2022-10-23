import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router } from '/imports/startup/client/Router'
import { DatePick } from '/imports/ui/components/DatePick'

// ---

export function App() {
	const logout = () => Meteor.logout()

	return (
		<>
			<DatePick />
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
