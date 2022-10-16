import React from 'react'
import { deleteTaskMM } from '/imports/api/collections/tasks/methods/deleteTaskMM'
import { toggleDoneTaskMM } from '/imports/api/collections/tasks/methods/toggleDoneTaskMM'
import { Task } from '/imports/api/collections/tasks/tasks.types'

// ---

export function Task({ task }: { task: Task }) {
	const toggleChecked = async (taskId: string, isChecked: boolean) => {
		toggleDoneTaskMM({ taskId, isChecked })
	}

	const deleteTask = (taskId: string) => {
		deleteTaskMM({ taskId })
	}

	return (
		<li>
			<input
				type="checkbox"
				checked={!!task.isChecked}
				onClick={() => toggleChecked(task._id, task.isChecked)}
				readOnly
			/>
			<span>{task.text}</span>
			<button onClick={() => deleteTask(task._id)}>&times;</button>
		</li>
	)
}
