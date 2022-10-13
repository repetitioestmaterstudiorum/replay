import os from 'os'

// ---

// All the unchangeable (in runtime) configuration goes here. Everything else -> ConfigModule
const constants = {
	app: {
		name: 'replay',
		hostname: os.hostname(),
		port: process.env.PORT || '3000',
		env: process.env.NODE_ENV || 'development',
		isDev: process.env.NODE_ENV === 'development',
		isTest: process.env.NODE_ENV === 'test',
		isProd: process.env.NODE_ENV === 'production',
	},
	db: {
		uri: process.env.MONGO_URI || 'mongodb://localhost:3001',
	},
}

export const C = Object.freeze(constants)
