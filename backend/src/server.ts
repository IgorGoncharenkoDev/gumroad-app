import http from 'node:http'

import app from '@/app'
import { connectToMongoDB } from '@/config/db'
import { env } from '@/config/env'
import { chalkLogger } from '@/lib/chalkLogger'

async function startServer() {
  await connectToMongoDB()

  const port = env.PORT

  const server = http.createServer(app)

  server.listen(port, () => {
    chalkLogger.info(`Server is now running on port ${port}`)
  })
}

startServer().catch((err) => {
  chalkLogger.error(`Error when starting the server... :(, error: ${err}`)
  process.exit(1)
})
