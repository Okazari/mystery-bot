/*
  Botpress module template. This is your module's entry point.
  Please have a look at the docs for more information about config, init and ready.
  https://docs.botpress.io
*/

const _ = require('lodash')
const Promise = require('bluebird')
const botbuilder = require('botbuilder')
const restify = require('restify')
const incoming = require('./incoming')
const outgoing = require('./outgoing')
const actions = require('./actions')
const config = require('../config/config.json')

let botfmk = null

const outgoingMiddleware = (event, next) => {
  // TODO DEBUG
  // console.log('EVENT', event)

  if (event.platform !== 'botfmk') {
    return next()
  }
  if (!outgoing[event.type]) {
    return next('Unsupported event type: ' + event.type)
  }

  outgoing[event.type](event, next, botfmk)
}

module.exports = {

  init: function (bp) {
    bp.middlewares.register({
      name: 'botfmk.sendMessages',
      type: 'outgoing',
      order: 100,
      handler: outgoingMiddleware,
      module: 'botpress-botbuilder',
      description: 'Sends out messages that targets platform = botfmk.' +
      ' This middleware should be placed at the end as it swallows events once sent.'
    })

    bp.botfmk = {}
    _.forIn(actions, (action, name) => {
      bp.botfmk[name] = action
      var sendName = name.replace(/^create/, 'send')
      console.log('Created action ' + sendName)
      bp.botfmk[sendName] = Promise.method(function () {
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
    const server = restify.createServer()
    server.listen(process.env.port || process.env.PORT || 8080, function () {
      console.log('%s listening to %s', server.name, server.url)
    })

    const connector = new botbuilder.ChatConnector({
      appId: config.azure.app_id,
      appPassword: config.azure.app_password
    })
    botfmk = new botbuilder.UniversalBot(connector)
    server.post('/api/messages', connector.listen())

    incoming(bp, botfmk)
  }
}
