import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const documentSchema = z.object({
	id: z.string(),
	title: z.string(),
	issuer: z.string(),
	taxTotal: z.number().nonnegative(),
	total: z.number().nonnegative(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
})

export type Document = z.infer<typeof documentSchema>
