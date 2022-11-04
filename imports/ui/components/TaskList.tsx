import React, { useState } from 'react'
import { useFind, useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import { AddTask } from '/imports/ui/components/AddTask'
import { Task } from '/imports/ui/components/Task'
import { usersPublication } from '/imports/startup/publications/users.publications'
import { tasksPublication } from '/imports/startup/publications/tasks.publications'
import { User } from '/imports/api/collections/users/users.types'

// ---

export function TaskList() {
	const [hideDone, setHideDone] = useState(true)

	const { userId, replayDate, isUsersLoading } = useTracker(() => {
		const usersSubscription = usersPublication()
		const user: User | null = Meteor.user({ fields: { 'uiState.replayDate': 1 } })

		return {
			isUsersLoading: !usersSubscription.ready(),
			userId: user?._id,
			replayDate: user?.uiState?.replayDate,
		}
	}, [])

	const isTasksLoading = useTracker(() => {
		if (!isUsersLoading) {
			const tasksSubscription = tasksPublication({ replayDate: replayDate })

			return !tasksSubscription.ready()
		}
	}, [isUsersLoading, replayDate])

	const tasks =
		useFind(() => {
			if (userId) {
				const selector = hideDone ? { isChecked: { $ne: true }, userId } : { userId }

				return TasksCollection.find(selector, { sort: { createdAt: -1 } })
			}
		}, [hideDone, isTasksLoading]) || []

	return isTasksLoading ? (
		<h2>Loading :)</h2>
	) : (
		<div>
			<AddTask />
			<div className="filter">
				<button onClick={() => setHideDone(!hideDone)}>
					{hideDone ? 'Show Done' : 'Hide Done'}
				</button>
			</div>
			<ul>
				{tasks.map(task => (
					<Task key={task._id} task={task} />
				))}
			</ul>
		</div>
	)
}
