import { ZodSchema } from 'zod'

// ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function enforceSchema(schema: ZodSchema, data: any) {
	return schema.parse(data)
}
