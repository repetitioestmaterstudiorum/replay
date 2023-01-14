import React, { useState, useEffect } from 'react'
import { useSubscribe, useTracker } from 'meteor/react-meteor-data'
import { User } from '/imports/api/collections/users/users.collection'
import { Meteor } from 'meteor/meteor'
import { AddTask } from '/imports/ui/components/AddTask'
import { TaskList } from '/imports/ui/components/TaskList'
import { callWithPromise } from '/imports/ui/ui.utils'
import type { DbTask } from '/imports/api/collections/tasks/tasks.collection'
import { GetCurrentTasksArgs } from '/imports/api/collections/tasks/tasks.methods'

// ---

export const Tasks = () => {
	const [tasks, setTasks] = useState<DbTask[]>([])

	const isUserLoading = useSubscribe('user')
	const { userId, replayDate, hideDone } = useTracker(() => {
		const user: User | null = Meteor.user()

		if (!user) return {}

		return {
			userId: user?._id,
			replayDate: user?.uiState?.replayDate,
			hideDone: user?.uiState?.hideDone,
		}
	}, [Meteor.userId()])

	useEffect(() => {
		setTasks([])
		async function fetchTasks() {
			const tasks = await callWithPromise<GetCurrentTasksArgs, DbTask[]>(
				'getCurrentTasksMM',
				{
					hideDone,
					replayDate,
				}
			)
			if (!tasks) return

			setTasks(tasks)
		}

		fetchTasks()
	}, [userId, replayDate, hideDone])

	return isUserLoading() || !userId ? (
		<h2>Loading :)</h2>
	) : (
		<div>
			<h1>Task List</h1>
			📝️ pending tasks: {tasks.length || '0'}
			<AddTask userId={userId} setTasks={setTasks} />
			<div className="filter">
				<button onClick={() => callWithPromise('setHideDoneMM', !hideDone)}>
					{hideDone ? 'Show completed tasks' : 'Hide completed tasks'}
				</button>
			</div>
			<TaskList tasks={tasks} setTasks={setTasks} />
		</div>
	)
}
