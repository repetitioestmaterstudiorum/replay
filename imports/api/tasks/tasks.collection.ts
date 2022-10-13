import { Mongo } from 'meteor/mongo'
import { Task } from '/imports/api/tasks/tasks.types'

// ---

export const TasksCollection = new Mongo.Collection<Task>('tasks')
