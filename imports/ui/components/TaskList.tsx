import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import { Task as TaskType } from '/imports/api/collections/tasks/tasks.types'
import { AddTask } from '/imports/ui/components/AddTask'
import { Task } from '/imports/ui/components/Task'

// ---

export function TaskList() {
	const [hideCompleted, setHideCompleted] = useState(true)

	type TrackerReturns = { tasks: TaskType[] | []; isLoading?: boolean }

	const { tasks, isLoading }: TrackerReturns = useTracker(() => {
		const noDataAvailable = { tasks: [] }
		if (!Meteor.user()) {
			return noDataAvailable
		}

		const tasksSubscription = Meteor.subscribe('tasks')

		if (!tasksSubscription.ready()) {
			return { ...noDataAvailable, isLoading: true }
		}

		const selector = hideCompleted ? { isChecked: { $ne: true } } : {}
		const tasks = TasksCollection.find(selector, { sort: { createdAt: -1 } }).fetch()
		return { tasks }
	})

	return isLoading ? (
		<h2>Loading :)</h2>
	) : (
		<div>
			<AddTask />
			<div className="filter">
				<button onClick={() => setHideCompleted(!hideCompleted)}>
					{hideCompleted ? 'Show All' : 'Hide Completed'}
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
