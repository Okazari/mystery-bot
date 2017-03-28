
module.exports = (bp, botfmk) => {
  const sendMessageToIncomingMiddlewares = (session) => {
    // push the message to the incoming middleware

    const {message} = session

    // TODO DEBUG
    // console.log('MESSAGE', message)

    bp.middlewares.sendIncoming({
      platform: 'botfmk',
      type: 'message',
      text: message.text || 'No text',
      raw: message,
      session
    })
  }

  botfmk.dialog('/', function (session) {
    sendMessageToIncomingMiddlewares(session)
  })
}
