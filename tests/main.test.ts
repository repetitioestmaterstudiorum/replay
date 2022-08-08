import { Meteor } from 'meteor/meteor'
import assert from 'assert'

// ---

describe('package name', function () {
	it('package.json has correct name', async function () {
		const { name } = await import('../package.json')
		assert.strictEqual(name, 'replay')
	})

	if (Meteor.isClient) {
		it('client is not server', function () {
			assert.strictEqual(Meteor.isServer, false)
		})
	}

	if (Meteor.isServer) {
		it('server is not client', function () {
			assert.strictEqual(Meteor.isClient, false)
		})
	}
})

/* vitest version (npm run test:vitest) */

// import { Meteor } from 'meteor/meteor'
// import assert from 'assert'

// // ---

// describe('package name', function () {
// 	test('package.json has correct name', async function () {
// 		const { name } = await import('../package.json')
// 		expect(name).toBe('replay')
// 	})

// 	if (Meteor.isClient) {
// 		test('client is not server', function () {
// 			expect(Meteor.isServer).toBe(false)
// 		})
// 	}

// 	if (Meteor.isServer) {
// 		test('server is not client', function () {
// 			expect(Meteor.isClient).toBe(false)
// 		})
// 	}
// })
