const http = require("http");
const os = require("os");

const hostname = os.hostname();

const initializeDb = require("./src/models");

const app = require('./src/app');

const server = http.createServer(app);

let PORT = process.env.NODE_ENV ? 5000 : process.env.PORT ;

initializeDb((err,db)=>{
  if (err) {
    console.error('err',err);
  }
  
  server.listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`-- Listening: http://localhost:${PORT} --`);
    console.log(`-- Container ID: ${hostname} --`);
    /* eslint-enable no-console */
  });
})
