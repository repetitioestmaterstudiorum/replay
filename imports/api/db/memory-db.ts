import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoInternals } from 'meteor/mongo'
import { MongoClient, Db } from 'mongodb'

// ---

class MemoryDb {
	private client: MongoClient | undefined
	public db: Db | undefined
	public ready = false

	async init() {
		if (this.client) {
			const err = new Error(`MemoryDb already initialized`)
			console.error(err)
			throw err
		}

		const memoryDbServer = await MongoMemoryServer.create()
		const uri = memoryDbServer.getUri()

		// back in the days there was `MongoInternals.RemoteCollectionDriver`, but not anymore apparently (https://stackoverflow.com/questions/20535755/using-multiple-mongodb-databases-with-meteor-js)
		this.client = new MongoInternals.NpmModules.mongodb.module.MongoClient(uri)
		await this.client.connect()

		this.db = this.client.db()

		this.ready = true
		console.info(`MemoryDb initiated with uri ${uri}`)

		return 'MemoryDb init successful'
	}
}

// exporting the class directly via `export class MemoryDb` throws an error: export declarations of type ClassDeclaration are not supported
export { MemoryDb }
