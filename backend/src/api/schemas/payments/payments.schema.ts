import { z } from 'zod'

export const createCheckoutSchema = z.object({
  productId: z.string().trim().min(1, 'Product ID is required'),
})

export type CreateCheckoutRequestBodyDTO = z.infer<typeof createCheckoutSchema>