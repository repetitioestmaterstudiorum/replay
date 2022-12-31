import React, { useState } from 'react'
import { useFind, useSubscribe, useTracker } from 'meteor/react-meteor-data'
import {
	TasksCollection,
	TasksReplayCollection,
} from '/imports/api/collections/tasks/tasks.collection'
import { AddTask } from '/imports/ui/components/AddTask'
import { Task } from '/imports/ui/components/Task'
import { User } from '/imports/api/collections/users/users.collection'
import { Meteor } from 'meteor/meteor'
import { DocWithDbFields } from '/imports/api/db/db.types'
import type { Task as TaskType } from '/imports/api/collections/tasks/tasks.collection'

// ---

export function TaskList() {
	const [hideDone, setHideDone] = useState(true)

	const isUserLoading = useSubscribe('user')

	// TODO: top level component / context to load user data from
	const { userId, replayDate } = useTracker(() => {
		const user: User | null = Meteor.user({ fields: { 'uiState.replayDate': 1 } })

		return {
			userId: user?._id,
			replayDate: user?.uiState?.replayDate,
		}
	}, [Meteor.userId()])

	console.log('replayDate', replayDate)

	// useEffect(() => {
	// 	if (userId) {
	// 		const fetchTasks = async () => {
	// 			// get the data from the api
	// 			const data = await findTasks({ selector: { userId } })
	// 			console.log('data?.count()', data?.count())

	// 			return data
	// 		}

	// 		fetchTasks()
	// 	}
	// }, [])

	// const isTasksLoading = replayDate
	// 	? useSubscribe('tasksReplay', { replayDate })
	// 	: useSubscribe('tasks')

	// const tasksSub = Meteor.subscribe('tasks')

	// const isTasksLoading = tasksSub.ready()
	// console.log('isTasksLoading', isTasksLoading)

	const isTasksLoading = useSubscribe('tasks')

	const tasks =
		useFind(() => {
			if (userId) {
				const selector = hideDone ? { isChecked: { $ne: true }, userId } : { userId }
				console.log('replayDate inside useFind()', replayDate)

				const collection = replayDate
					? TasksCollection
					: (TasksReplayCollection as Awaited<typeof TasksReplayCollection>)
				return collection.find(selector, { sort: { createdAt: -1 } })
			}
		}, [hideDone, replayDate, isTasksLoading()]) || []

	return isUserLoading() || isTasksLoading() ? (
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
					<Task key={task._id} task={task as DocWithDbFields<TaskType>} />
				))}
			</ul>
		</div>
	)
}
