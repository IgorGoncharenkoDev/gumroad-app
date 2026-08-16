import mongoose from 'mongoose'

import { env } from '@/config/env'
import { logger } from '@/lib/logger'

export async function connectToMongoDB() {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    
    logger.success('Connected to MongoDB')
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error}`)
    
    process.exit(1)
  }
}