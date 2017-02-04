const log = (msg) => console.log('[SOCKET]', msg)
const bot = require('./bot')
module.exports = (io) => {
  io.on('connection', (socket => {

    log('CONNECT')
    bot.send(`rivescript hello`).then(response => {
      socket.emit('chat response', { message: response })
      bot.send(`rivescript next confs`).then(response => {
        socket.emit('chat response', { message: response })
      })
    })

    socket.on('disconnect', () => log('DISCONNECT'))

    socket.on('chat message', function(request) {
      log(`I received : ${request.message}`)
      bot.send(`rivescript ${request.message}`).then(response => {
        socket.emit('chat response', { message: response })
        log(`I answered : ${response}`, response)
      })
    })

  }))
}
