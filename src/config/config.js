
require('dotenv').config()

const { logger } = require('../utils/pino-logger')
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'db_nodeskeleton',
    host: '0.0.0.0',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 30000
    },
    logging: msg => logger.info(`-- ${msg} --`)
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_DIALECT,
    logging: false,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 30000
    }
  }
}
