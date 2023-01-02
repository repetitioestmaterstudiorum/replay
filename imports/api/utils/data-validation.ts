import { ZodTypeAny } from 'zod'

// ---

// eslint-disable-next-line
export function parseSchema(schema: ZodTypeAny, data: any) {
	return schema.safeParse(data)?.success
}
