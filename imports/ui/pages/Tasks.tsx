import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { TasksCollection } from '/imports/api/tasks/tasks.collection'
import { TaskList } from '/imports/ui/components/TaskList'

// ---

export const Tasks = () => {
	const pendingTasksCount = useTracker(() =>
		TasksCollection.find({ isChecked: { $ne: true } }).count()
	)

	return (
		<div>
			<h1>Task List</h1>
			📝️ pending tasks: {pendingTasksCount || '0'}
			<TaskList />
		</div>
	)
}
