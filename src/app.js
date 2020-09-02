const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require("compression");
const parseError = require("parse-error");
const { expressPino } = require("./utils/pino-logger");

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(compression());
//app.use(helmet());

app.use(expressPino);

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

process.on('unhandledRejection', error => {
  console.error('Uncaught Error', parseError(error));
});
