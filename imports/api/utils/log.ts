import _ from 'lodash'
import { insertLog } from '/imports/api/logs/logs.mutations'
import type { Log } from '/imports/api/logs/logs.types'
import { C } from '/imports/startup/iso-constants'

// ---

type LogParams = {
	text: Log['text']
	data?: Log['data']
	severity?: Log['severity']
}

export async function log({ text, data, severity = 'info' }: LogParams) {
	const timestamp = new Date()

	logToStd({
		text,
		data,
		severity,
		timestamp,
	})

	if (Meteor.isServer) {
		logToDb({ text, data, severity, timestamp })
	}
}

// helpers
type LogFnParams = {
	text: Log['text']
	data?: Log['data']
	severity: Log['severity']
	timestamp: Date
}

function logToStd({ text, data, severity, timestamp }: LogFnParams) {
	// color codes for logging (https://simplernerd.com/js-console-colors/)
	const colorCode = severity === 'info' ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m'

	console[severity](colorCode, `${timestamp.toISOString()}`, text)
	if (data) {
		if (_.isObject(data) && !_.isEmpty(data)) data = JSON.stringify(data, null, 2)
		console[severity](data)
	}
}

async function logToDb({ text, data, severity, timestamp }: LogFnParams) {
	const logData = {
		text,
		data,
		severity: severity as Log['severity'], // not nice, but how to avoid?
		timestamp,
		hostname: C.app.hostname,
		env: C.app.env,
	}

	insertLog(logData)
}
