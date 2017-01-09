const log = (msg) => console.log('[SOCKET]', msg)
const mapping = require('./bot.json')
module.exports = (io) => {
  io.on('connection', (socket => {
    log('CONNECT')
    socket.on('disconnect', () => log('DISCONNECT'))
    socket.on('chat message', function(request) {
      log(`I received : ${request.message}`)
      const message = request.message.toLowerCase()
      if(mapping[message]) {
        socket.emit('chat response', { message: mapping[message] })
        log(`I answered : ${mapping[message]}`)
      }
    })
  }))
}