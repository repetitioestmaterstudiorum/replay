import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import DatePicker from 'react-date-picker'
import type { User } from '/imports/api/collections/users/users.collection'
import { callWithPromise } from '/imports/ui/ui.utils'

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
				value={user?.uiState?.replayDate || new Date()}
			/>
		</div>
	) : null
}

function isToday(date: Date) {
	const today = new Date()
	return today.toDateString() === date.toDateString() ? true : false
}
