import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  PORT: z.coerce.number().default(5010),

  MONGO_URI: z.string().min(1),

  FRONTEND_ORIGIN: z.url(),

  COOKIE_NAME: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  FIRECRAWL_API_BASE_URL: z.url(),
  FIRECRAWL_API_KEY: z.string().min(1),

  STRIPE_KEY_ID: z.string().min(1),
  STRIPE_KEY_SECRET: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),

  WEB_BASE_URL: z.url(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error(parsed.error.format())

  throw new Error('Invalid environment variables')
}

export const env = parsed.data
