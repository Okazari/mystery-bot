const path = require('path')
const RiveScript = require('rivescript')
const executeJS = require('./executeJS')
const actions = require('../actions')

let brain
const init = () => {
  return new Promise((resolve, reject) => {
    brain = new RiveScript({utf8: true})
    brain.loadFile(path.join(__dirname, 'brain.rive'), loadingDone, loadingError)

    function loadingDone (batchNum) {
      brain.sortReplies()
      brain.actions = actions
      console.log('RiveScript bot loaded!')
      resolve()
    }

    function loadingError (error) {
      console.log('Error when loading RiveScript files: ' + error)
      reject(error)
    }
  })
}

const reply = (userId, message, callback) => {
  const doReply = (userId, message, callback) => {
    const replied = brain.reply(userId, message)
    const result = executeJS(brain, replied)
    callback(result)
  }

  if (!brain) {
    init().then(() => doReply(userId, message, callback))
  } else {
    doReply(userId, message, callback)
  }
}

const send = (userId, message, callback) => {
  console.log('MESSAGE', message)
  reply(userId, message, replied => {
    if (replied) {
      callback(replied)
    }
  })
}

module.exports = {
  reply,
  send
}
