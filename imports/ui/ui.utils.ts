export function callWithPromise(methodName: string, args?: unknown) {
	return new Promise((resolve, reject) => {
		Meteor.call(methodName, args, (err: Error, res: unknown) => {
			if (err) reject('Something went wrong')
			resolve(res)
		})
	})
}
