import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// options: https://vitest.dev/config/
		setupFiles: 'dotenv/config', // load variables form .env file
		deps: {
			external: ['**/node_modules/**', '**/build/**'], // default is node_modules and dist, but meteor builds in build
		},
	},
})
