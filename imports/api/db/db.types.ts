export type DefaultDbFields = {
	_id: string
	// not really optional props (mandatory in all db docs) but this simplifies insert methods because dates should be created automatically elsewhere
	createdAt?: Date
	updatedAt?: Date
}
