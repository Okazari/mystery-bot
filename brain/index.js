const path = require('path')
const RiveScript = require('rivescript')

let brain
const init = () => {
  return new Promise((resolve, reject) => {
    brain = new RiveScript({utf8: true})
    brain.loadFile(path.join(__dirname, 'brain.rive'), loadingDone, loadingError)

    function loadingDone (batchNum) {
      brain.sortReplies()
      console.log('RiveScript bot loaded!')
      resolve()
    }

    function loadingError (error) {
      console.log('Error when loading RiveScript files: ' + error)
      reject(error)
    }
  })
}

const send = (userId, message, callback) => {
  const doReply = (message) => {
    const result = brain.reply(userId, message)
    callback({
      content: result,
      type: 'Note'
    })
  }

  if (!brain) {
    init().then(() => doReply(message))
  } else {
    doReply(message)
  }
}

module.exports = {
  send
}
