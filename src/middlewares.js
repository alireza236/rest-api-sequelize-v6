const ErrorResponse = require('./utils/errorResponse')
const { logger } = require('./utils/pino-logger')

const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (err.code === 11000) {
    const message = 'Duplicate Field value entered'
    error = new ErrorResponse(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  logger.error(error.message)

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = {
  notFound,
  errorHandler
}
