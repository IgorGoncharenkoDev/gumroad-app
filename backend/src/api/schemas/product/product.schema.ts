import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(2).trim(),
  description: z.string().trim().default(''),
  price: z.coerce.number().int().min(99),
})

export type CreateProductRequestBodyDTO = z.infer<typeof createProductSchema>
