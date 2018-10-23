module.exports = {
  /**
   * Normalize a port into a number, string, or false.
   */
  normalizePort(value) {
    const port = parseInt(value, 10);
    if (isNaN(port)) {
      // named pipe
      return value;
    }
  
    return port >= 0 ? port : false;
  },

  /**
   * Event listener for HTTP server 'error' event.
   */
  onError(err) {
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
  },

  /**
   * Event listener for HTTP server 'listening' event.
   */
  onListening() {
    const addr = this.address();
    const bind = typeof addr == 'string'
      ? `pipe ${addr}`
      : `${addr.address}:${addr.port}`;

    console.log(`Listening on ${bind}`);
  }
};
