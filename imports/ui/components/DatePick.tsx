import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import DatePicker from 'react-date-picker'
import { setReplayDate } from '/imports/api/collections/users/methods/users.setReplayDate'
import { unsetReplayDate } from '/imports/api/collections/users/methods/users.unsetReplayDate'
import type { User } from '/imports/api/collections/users/users.types'

// ---

export function DatePick() {
	const user: User | null = useTracker(() => Meteor.user())

	return (
		<div>
			<DatePicker
				onChange={(date: Date) => {
					if (date === null || isToday(date)) {
						unsetReplayDate({})
					} else {
						setReplayDate({ replayDate: date })
					}
				}}
				value={user?.uiState?.replayDate || new Date()}
			/>
		</div>
	)
}

function isToday(date: Date) {
	const today = new Date()
	return today.toDateString() === date.toDateString() ? true : false
}
