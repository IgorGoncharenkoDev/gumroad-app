import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(2).trim(),
  description: z.string().trim().default(''),
  price: z.coerce
    .number()
    .min(4.99)
    .refine(
      (value) => Number.isInteger(value * 100),
      'Price must have at most 2 decimal places',
    ),
})

export type CreateProductRequestBodyDTO = z.infer<typeof createProductSchema>
