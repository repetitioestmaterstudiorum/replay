import React from 'react'
import type { DbTask } from '/imports/api/collections/tasks/tasks.collection'
import { Task } from '/imports/ui/components/Task'

// ---

export function TaskList(props: Props) {
	const { tasks, setTasks } = props

	return (
		<ul>
			{tasks.map(task => {
				return <Task key={task._id} task={task} setTasks={setTasks} />
			})}
		</ul>
	)
}

type Props = {
	tasks: DbTask[]
	setTasks: React.Dispatch<React.SetStateAction<DbTask[]>>
}
