import { C } from '/imports/startup/client/client-constants'

// ---

export function callWithPromise<ArgsType, ReturnType>(
	methodName: string,
	args?: ArgsType
): Promise<ReturnType> {
	return new Promise((resolve, reject) => {
		Meteor.call(methodName, args, (err: Error, res: ReturnType) => {
			if (err) {
				const message = 'Something went wrong in callWithPromise()'
				reject(message)

				if (C.app.isProd) return
				console.error(`${message} with methodName: ${methodName} and args:`, args, err)
			}

			resolve(res)
		})
	})
}
