const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const compression = require('compression')

const { expressPino } = require('./utils/pino-logger')

require('dotenv').config()

const middlewares = require('./middlewares')
const api = require('./api')
const auth = require('./auth')

const app = express()

app.use(cors())
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
// app.use(compression());
// app.use(helmet());

app.use(expressPino)

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  })
})

app.use(auth)

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
