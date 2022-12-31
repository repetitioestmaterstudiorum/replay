import React, { useState } from 'react'
import { callWithPromise } from '/imports/ui/ui.utils'

// ---

export function AddTask() {
	const [text, setText] = useState('')

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!text) return

		callWithPromise('insertTaskMM', { text })
		setText('')
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
