const http = require('http');
const PORT = 4000;
const hostname = '0.0.0.0';

// createServer is the http method used to create a web server that takes a callback.

// callback function definition
const serverHandler = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Hello World',
    env: process.env
  }));

}

const server = http.createServer(serverHandler);
server.listen(PORT, hostname, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})
