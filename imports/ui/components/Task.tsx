import React from 'react'
import { deleteTaskMM } from '/imports/api/collections/tasks/methods/tasks.deleteTaskMM'
import { toggleTaskMM } from '/imports/api/collections/tasks/methods/tasks.toggleTaskMM'
import type { Task } from '/imports/api/collections/tasks/tasks.collection'
import { DocWithDbFields } from '/imports/api/db/db.types'

// ---

export function Task({ task }: { task: DocWithDbFields<Task> }) {
	const toggleChecked = async (taskId: string, isChecked: boolean) => {
		toggleTaskMM({ taskId, isChecked })
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
