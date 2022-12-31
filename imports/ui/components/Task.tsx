import React from 'react'
import type { Task } from '/imports/api/collections/tasks/tasks.collection'
import { DbDocType } from '/imports/api/db/db.types'
import { callWithPromise } from '/imports/ui/ui.utils'

// ---

export function Task({ task }: { task: DbDocType<Task> }) {
	const toggleChecked = async (taskId: string, isChecked: boolean) => {
		callWithPromise('toggleTaskMM', { taskId, isChecked })
	}

	const deleteTask = (taskId: string) => {
		callWithPromise('deleteTaskMM', { taskId })
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
