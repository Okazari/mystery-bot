
module.exports = (bp, broid) => {
  const sendMessageToIncomingMiddlewares = (message) => {
    // push the message to the incoming middleware

    const {text} = message

    console.log('MESSAGE', message)

    bp.middlewares.sendIncoming({
      platform: 'broid',
      type: 'message',
      text: text || 'No text',
      raw: message
    })
  }

  broid.connect()
  .subscribe({
    next: data => console.log(data),
    error: err => console.error(`Something went wrong: ${err.message}`),
    complete: () => console.log('complete')
  })

  broid.listen()
  .subscribe({
    next: sendMessageToIncomingMiddlewares,
    error: err => console.error(`Something went wrong: ${err.message}`),
    complete: () => console.log('complete')
  })
}
