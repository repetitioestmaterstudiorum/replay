import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '/imports/ui/pages/Login'
import { FourOFour } from '/imports/ui/pages/404'
import { TaskList } from '/imports/ui/components/TaskList'

// ---

export const Router = () => {
	const isLoggedIn = useTracker(() => !!Meteor.userId())

	const logout = () => Meteor.logout()

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<>
						<Route path="/" element={<TaskList />} />
						<Route path="*" element={<FourOFour />} />
					</>
				) : (
					<Route path="/" element={<Login />} />
				)}
			</Routes>
			<div
				className="user"
				onClick={logout}
				style={{ cursor: 'pointer', position: 'absolute', bottom: '10px' }}
			>
				🚪 logout "{Meteor.user()?.username}"
			</div>
		</BrowserRouter>
	)
}
