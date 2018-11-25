const path = require('path');
const http = require('http');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(port) {
  if (typeof port != 'number') {
    // named pipe
    return port;
  }
  
  return port >= 0 ? port : false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(err) {
  if (err.syscall != 'listen') {
    throw error;
  }
  
  /*const bind = typeof PORT == 'string'
    ? `Pipe ${PORT}`
    : `Port ${PORT}`;*/
  
  // handle specific listen errors with friendly messages
  switch (err.code) {
    case 'EACCES':
      console.error(`Server requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Server port is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
  const addr = this.address();
  const bind = typeof addr == 'string'
    ? `pipe ${addr}`
    : `${addr.address}:${addr.port}`;

  console.log(`Listening on ${bind}`);
}

module.exports = function createServer(root) {
  root = path.resolve(root);

  // Load environment variables
  const env = require('./env');
  env.config({
    path: root + '/.env',
  });

  // Create a HTTP server
  const app = require(root + '/app');
  const PORT = normalizePort(env.PORT) || 3000;
  const server = http.createServer(app.callback());

  // Start listening on the server and add logging functions
  server.listen(PORT).on('error', onError).on('listening', onListening);
}
