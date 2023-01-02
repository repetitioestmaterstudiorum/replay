import React from 'react'
import type { DbTask, Task } from '/imports/api/collections/tasks/tasks.collection'
import { callWithPromise } from '/imports/ui/ui.utils'

// ---

export function Task(props: Props) {
	const { task, setTasks } = props

	const toggleChecked = async (taskId: string, isChecked: boolean) => {
		// to be really sure UI state == DB state, manual checkbox selected or not would have to be done here
		callWithPromise<ToggleTaskArgs, number>('toggleTaskMM', {
			taskId,
			isChecked,
		})
	}

	const deleteTask = async (taskId: string) => {
		const isDeleteSuccessful = await callWithPromise<string, number>('removeTaskMM', taskId)
		if (isDeleteSuccessful) {
			setTasks(previousTasks => previousTasks.filter(t => t._id !== taskId))
		}
	}

	return (
		<li>
			<input
				type="checkbox"
				defaultChecked={task.isChecked}
				onClick={() => toggleChecked(task._id, task.isChecked)}
			/>
			<span>{task.text}</span>
			<button onClick={() => deleteTask(task._id)}>&times;</button>
		</li>
	)
}

type Props = { task: DbTask; setTasks: React.Dispatch<React.SetStateAction<DbTask[]>> }

type ToggleTaskArgs = {
	taskId: string
	isChecked: boolean
}
