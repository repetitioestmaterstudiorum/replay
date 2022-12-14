import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
// import { User } from '/imports/api/collections/users/users.collection'
import { updateUser } from '/imports/api/collections/users/users.mutations'
import { checkLoggedIn } from '/imports/api/meteor-methods/auth'

// ---

Meteor.methods({
	setReplayDateMM: setReplayDate,
	unsetReplayDateMM: unsetReplayDate,
	setHideDoneMM: setHideDone,
})

// TODO why does User['uiState']['replayDate'] not work
async function setReplayDate({ replayDate }: { replayDate: Date }) {
	check(replayDate, Date)
	const userId = checkLoggedIn()

	return await updateUser(userId, { $set: { 'uiState.replayDate': replayDate } })
}

async function unsetReplayDate() {
	const userId = checkLoggedIn()

	return await updateUser(userId, { $unset: { 'uiState.replayDate': true } })
}

async function setHideDone(hideDone: boolean) {
	check(hideDone, Boolean)
	const userId = checkLoggedIn()

	return await updateUser(userId, { $set: { 'uiState.hideDone': hideDone } })
}
