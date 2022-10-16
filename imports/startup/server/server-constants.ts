import { C as isoC } from '/imports/startup/iso-constants'

// ---

export const constants = {
	...isoC,
	defaultAdmin: {
		username: process.env.DEFAULT_ADMIN_USERNAME || 'meteorish',
		password: process.env.DEFAULT_ADMIN_PASSWORD || '123456789',
	},
	collections: {
		tasks: {
			idxs: [
				{
					key: { text: 1 },
					name: 'text',
				},
			],
		},
		logs: {
			idxs: [
				{
					key: { createdAt: 1 },
					name: 'expire_after_30_d',
					expireAfterSeconds: 60 * 60 * 24 * 30,
				},
				{
					key: { timestamp: 1 },
					name: 'timestamp',
				},
				{
					key: { env: 1 },
					name: 'env',
				},
				{
					key: { severity: 1 },
					name: 'severity',
				},
			],
		},
	},
}

export const C = Object.freeze(constants)
