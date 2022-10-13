import { C as isoC } from '/imports/startup/iso-constants'

// ---

export const constants = {
	...isoC,
	defaultAdmin: {
		username: process.env.DEFAULT_ADMIN_USERNAME || 'meteorish',
		password: process.env.DEFAULT_ADMIN_PASSWORD || '123456789',
	},
}

export const C = Object.freeze(constants)
