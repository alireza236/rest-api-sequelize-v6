const http = require("http");

const initializeDb = require("../src/models/index")

const app = require('./app');

const server = http.createServer(app);

let PORT = process.env.NODE_ENV ? 5000 : process.env.PORT ;

initializeDb((err,db)=>{
  if (err) {
    console.error('err',err);
  }
  
  server.listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${PORT}`);
    /* eslint-enable no-console */
  });
})
