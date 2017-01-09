const log = (msg) => console.log('[SOCKET]', msg)
const bot = require('./bot')
module.exports = (io) => {
  io.on('connection', (socket => {
    log('CONNECT')
    socket.on('disconnect', () => log('DISCONNECT'))
    socket.on('chat message', function(request) {
      log(`I received : ${request.message}`)      
      const response = bot.send(`message ${request.message}`)
      if(response) {
        socket.emit('chat response', { message: response })
        log(`I answered : ${response}`)
      }
    })
  }))
}