import os from 'os'

// ---

// All the unchangeable (in runtime) configuration goes here
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
}

export const C = Object.freeze(constants)
