/*
  Botpress module template. This is your module's entry point.
  Please have a look at the docs for more information about config, init and ready.
  https://docs.botpress.io
*/

const _ = require('lodash')
const Promise = require('bluebird')
const BroidMessenger = require('broid-messenger')
const incoming = require('./incoming')
const outgoing = require('./outgoing')
const actions = require('./actions')

let broid = null

const outgoingMiddleware = (event, next) => {
  if (event.platform !== 'broid') {
    return next()
  }
  if (!outgoing[event.type]) {
    return next('Unsupported event type: ' + event.type)
  }

  outgoing[event.type](event, next, broid)
}

module.exports = {

  init: function (bp) {
    bp.middlewares.register({
      name: 'broid.sendMessages',
      type: 'outgoing',
      order: 100,
      handler: outgoingMiddleware,
      module: 'botpress-broid',
      description: 'Sends out messages that targets platform = broid.' +
      ' This middleware should be placed at the end as it swallows events once sent.'
    })

    bp.broid = {}
    _.forIn(actions, (action, name) => {
      bp.broid[name] = action
      var sendName = name.replace(/^create/, 'send')
      console.log('Created action ' + sendName)
      bp.broid[sendName] = Promise.method(function () {
        var msg = action.apply(this, arguments)
        msg.__id = new Date().toISOString() + Math.random()
        const resolver = {event: msg}
        const promise = new Promise(function (resolve, reject) {
          resolver.resolve = resolve
          resolver.reject = reject
        })
        bp.middlewares.sendOutgoing(msg)
        return promise
      })
    })
  },

  ready: function (bp) {
    broid = new BroidMessenger({
      token: 'EAAPOMTUZAPv0BAJE1M30PdJtiZAe7afZA2bqnDhkWzSg1qekchetRBxtZBSPP5U8Lt7rGgZAogtmLmim8k7iOP7VNQL55mFjVQuuceTVCZAz3zw2KUUlmWrnVpdI26PLRDAj0B0BezIgkQDsBZBB1tOItO8GnK8U3ASz1pj6mJxsgZDZD',
      tokenSecret: 'toto'
    })

    incoming(bp, broid)
  }
}
