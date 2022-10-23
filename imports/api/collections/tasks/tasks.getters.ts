import { TasksCollection } from '/imports/api/collections/tasks/tasks.collection'
import { Task } from '/imports/api/collections/tasks/tasks.types'
import { FindParams } from '/imports/api/db/db.types'
import { find } from '/imports/api/db/generic-collection-methods'

// ---

export async function findTasks({ selector, options, replayDate }: FindParams<Task> = {}) {
	return await find<Task>({ collection: TasksCollection, selector, options, replayDate })
}
