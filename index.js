const http = require("http");
const os = require("os");

const {logger}  = require("./src/utils/pino-logger");

const hostname = os.hostname();


const app = require('./src/app');

const server = http.createServer(app);

let PORT = process.env.NODE_ENV ? 5000 : process.env.PORT ;

 
  server.listen(PORT, () => {
    /* eslint-disable no-console */
    logger.info(`-- Listening: http://localhost:${PORT} --`);
    logger.info(`-- Container ID: ${hostname} --`);
    /* eslint-enable no-console */
  });
