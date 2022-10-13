import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'
import { Task } from '/imports/api/tasks/tasks.types'
import { AddTask } from '/imports/ui/components/AddTask'

export function TaskList() {
	const [hideCompleted, setHideCompleted] = useState(true)

	type TrackerReturns = { tasks: Task[] | []; isLoading?: boolean }

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
		// TODO create loader component
		<p>Loading ...</p>
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
					<OneTask key={task._id} task={task} />
				))}
			</ul>
		</div>
	)
}

function OneTask({ task }: { task: Task }) {
	const toggleChecked = (task: Task) => {
		Meteor.call('tasks.toggleChecked', task) // TODO call with promise
	}

	const deleteTask = (taskId: Task['_id']) => {
		Meteor.call('tasks.delete', taskId) // TODO call with promise
	}

	return (
		<li>
			<input
				type="checkbox"
				checked={!!task.isChecked}
				onClick={() => toggleChecked(task)}
				readOnly
			/>
			<span>{task.text}</span>
			<button onClick={() => deleteTask(task._id)}>&times;</button>
		</li>
	)
}
