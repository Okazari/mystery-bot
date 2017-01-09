const http = require('http')
const app = require('./app/express.js')
const socket = require('./app/socket.js')
const io = require('socket.io')
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }  

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening = () => {
  var addr = httpServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

const port = process.env.PORT || '3000';
app.set('port', port);

const httpServer = http.createServer(app);
httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

socket(io(httpServer))

