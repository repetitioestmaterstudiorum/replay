import { Meteor } from 'meteor/meteor'
import { describe, test, expect } from 'vitest'

// ---

describe('replay', function () {
	test('package.json has correct name', async function () {
		const { name } = await import('../package.json')
		expect(name).toBe('replay')
	})

	if (Meteor.isClient) {
		test('client is not server', function () {
			expect(Meteor.isServer).toBe(false)
		})
	}

	if (Meteor.isServer) {
		test('server is not client', function () {
			expect(Meteor.isClient).toBe(false)
		})
	}
})
