import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import DatePicker from 'react-datepicker'
import type { User } from '/imports/api/collections/users/users.collection'
import { callWithPromise } from '/imports/ui/ui.utils'
import 'react-datepicker/dist/react-datepicker.css'

// ---

export function DatePick() {
	const user: User | null = useTracker(() => Meteor.user())

	return user ? (
		<div>
			<DatePicker
				onChange={(date: Date) => {
					if (date === null || isToday(date)) {
						callWithPromise('unsetReplayDateMM')
					} else {
						callWithPromise('setReplayDateMM', { replayDate: date })
					}
				}}
				selected={user?.uiState?.replayDate || new Date()}
			/>
		</div>
	) : null
}

function isToday(date: Date) {
	const today = new Date().toDateString()
	return today === date.toDateString() ? true : false
}
