import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { Router } from '/imports/startup/client/Router'
import { DatePick } from '/imports/ui/components/DatePick'

// ---

export function App() {
	const logout = () => Meteor.logout()
	const user = useTracker(() => Meteor.user())

	return (
		<>
			<DatePick />
			<Router />
			<div
				className="user"
				onClick={logout}
				style={{ cursor: 'pointer', position: 'absolute', bottom: '10px' }}
			>
				🚪 logout "{user?.username}"
			</div>
		</>
	)
}
