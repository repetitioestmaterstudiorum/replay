// Unchangeable (in runtime) configuration goes here
const constants = {
	app: {
		name: 'replay',
		isDev: Meteor.isDevelopment,
		isTest: Meteor.isTest,
		isProd: Meteor.isProduction,
	},
}

export const C = Object.freeze(constants)
