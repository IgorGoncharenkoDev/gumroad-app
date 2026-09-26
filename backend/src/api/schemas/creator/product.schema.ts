import mongoose from 'mongoose'
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

export const creatorProductSearchSchema = z.object({
  query: z.string().min(3).trim(),
  limit: z.coerce.number().min(1).max(10),
})

export type CreatorProductSearchRequestBodyDTO = z.infer<
  typeof creatorProductSearchSchema
>

export const updateProductSchema = z
  .object({
    title: z.string().min(2).trim(),
    description: z.string().trim(),
    price: z.coerce
      .number()
      .min(4.99)
      .refine(
        (value) => Number.isInteger(value * 100),
        'Price must have at most 2 decimal places',
      ),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided',
  )

export type UpdateProductRequestBodyDTO = z.infer<typeof updateProductSchema>

export const updateProductCoverSchema = z.object({
  imageAssetId: z
    .string()
    .refine((value) => mongoose.isValidObjectId(value), 'Invalid ObjectId'),
})

export type UpdateProductCoverRequestBodyDTO = z.infer<
  typeof updateProductCoverSchema
>

export const scrapeProductSchema = z.object({
  url: z.url(),
})

export type ScrapeProductRequestBodyDTO = z.infer<typeof scrapeProductSchema>

export const ingestAssetsSchema = z.object({
  selectedCandidates: z
    .array(
      z.object({
        sourcePageUrl: z.url(),
        url: z.url(),
      }),
    )
    .min(1, 'At least one asset image must be selected'),
})

export type IngestAssetsRequestBodyDTO = z.infer<typeof ingestAssetsSchema>
