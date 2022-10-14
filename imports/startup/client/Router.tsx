import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '/imports/ui/pages/Login'
import { FourOFour } from '/imports/ui/pages/404'
import { Tasks } from '/imports/ui/pages/Tasks'

// ---

export const Router = () => {
	const isLoggedIn = useTracker(() => !!Meteor.userId())

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<>
						<Route path="/" element={<Tasks />} />
						<Route path="*" element={<FourOFour />} />
					</>
				) : (
					<Route path="/" element={<Login />} />
				)}
			</Routes>
		</BrowserRouter>
	)
}
