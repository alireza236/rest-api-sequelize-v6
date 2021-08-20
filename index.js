const http = require('http')
const parseError = require('parse-error')

const os = require('os')

const { logger } = require('./src/utils/pino-logger')

const hostname = os.hostname()

const host = os.networkInterfaces()

const app = require('./src/app')

const server = http.createServer(app)

const env = process.env.NODE_ENV || 'production'

const PORT = env === 'production' ? process.env.PORT : 5000

server.listen(PORT, () => {
  /* eslint-disable no-console */
  logger.info(`-- Listening: http://${host.lo[0].address}:${PORT} --`)
  logger.info(`-- Hostname: ${hostname} --`)
  logger.info(`-- Running mode: ${env} --`)
  /* eslint-enable no-console */
})

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error))
  server.close(() => process.exit(1))
})
