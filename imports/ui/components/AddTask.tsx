import React, { useState } from 'react'
import { DbTask } from '/imports/api/collections/tasks/tasks.collection'
import { callWithPromise } from '/imports/ui/ui.utils'

// ---

export function AddTask(props: Props) {
	const { userId, setTasks } = props

	const [text, setText] = useState<string>('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!text) return

		const newTaskId = await callWithPromise<DbTask['text'], string>('addTaskMM', text)

		const timestamp = new Date()

		if (newTaskId) {
			const newTask = {
				_id: newTaskId,
				text,
				createdAt: timestamp,
				updatedAt: timestamp,
				userId,
				isChecked: false,
				isDeleted: false,
			}
			setTasks(previousTasks => [...previousTasks, newTask])
			setText('')
		}
	}

	return (
		<form className="task-form" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Type to add new tasks"
				value={text}
				onChange={e => setText(e.target.value)}
			/>

			<button type="submit">Add Task</button>
		</form>
	)
}

type Props = { userId: string; setTasks: React.Dispatch<React.SetStateAction<DbTask[]>> }
