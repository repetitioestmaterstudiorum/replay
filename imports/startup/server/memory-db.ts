import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoInternals } from 'meteor/mongo'
import { Db } from 'mongodb'

// ---

class MemoryDb {
	public db: Db | undefined
	public ready = false

	async init() {
		if (Meteor.isClient) return

		if (this.db) {
			const err = new Error(`MemoryDb already initialized`)
			console.error(err)
			throw err
		}

		const memoryDbServer = await MongoMemoryServer.create()
		const uri = memoryDbServer.getUri()

		// `MongoInternals.RemoteCollectionDriver` seems to be the way to go, despite it not being mentioned in Meteor's Mongo Types (https://stackoverflow.com/questions/20535755/using-multiple-mongodb-databases-with-meteor-js)
		// This would be an alternative, without Meteor's Mongo stuff:
		// const client = new MongoInternals.NpmModules.mongodb.module.MongoClient(uri)
		// await client.connect()
		// this.db = client.db()

		// @ts-ignore
		this.db = new MongoInternals.RemoteCollectionDriver(uri)
		this.ready = true

		console.info(`MemoryDb initiated with uri ${uri}`)

		return 'MemoryDb init successful'
	}
}

// exporting the class directly via `export class MemoryDb` throws an error: export declarations of type ClassDeclaration are not supported
export { MemoryDb }
