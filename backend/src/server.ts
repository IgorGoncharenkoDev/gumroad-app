import http from 'node:http'

import app from '@/app'
import { connectToMongoDB } from '@/config/db'
import { env } from '@/config/env'
import { logger } from '@/lib/logger'

async function startServer() {
  await connectToMongoDB()

  const port = env.PORT

  const server = http.createServer(app)

  server.listen(port, () => {
    logger.info(`Server is now running on port ${port}`)
  })
}

startServer().catch((err) => {
  logger.error(`Error when starting the server... :(, error: ${err}`)
  process.exit(1)
})
