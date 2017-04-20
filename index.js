const http = require('http')
const httpProxy = require('http-proxy')

const {init, ready} = require('./botpress-botbuilder')
const brain = require('./brain')

// Example of received message from broid-botbuilder

/*
{
  type: 'message',
  timestamp: '2017-03-19T18:22:16.5392998Z',
  text: 'rzaraz',
  textLocale: 'fr',
  sourceEvent: { clientActivityId: '1489947340922.1339951665525969.4' },
  attachments: [],
  entities: [],
  address:
   { id: 'b7128287f3824b3994de769d49e02bd0|0000009',
     channelId: 'webchat',
     user: { id: 'Gp3YBs3WoJC', name: 'You' },
     conversation: { id: 'b7128287f3824b3994de769d49e02bd0' },
     bot: { id: 'bot_fmk_test@-OIIASXN31A', name: 'bot-fmk-test' },
     serviceUrl: 'https://webchat.botframework.com/',
     useAuth: true },
  source: 'webchat',
  agent: 'botbuilder',
  user: { id: 'Gp3YBs3WoJC', name: 'You' }
}
*/

module.exports = function (bp) {
  init(bp)
  bp.middlewares.load()
  ready(bp)

  bp.hear({platform: 'botfmk', type: 'message'}, (event, next) => {
    // TODO DEBUG
    // console.log('EVENT', event)

    const text = event.text
    const {user} = event.raw
    const session = event.session

    const callback = (message) => {
      bp.botfmk.sendText(session, message)
    }

    const userId = user.id
    brain.send(userId, text, callback)
  })

  // Reverse proxy to handle the dashboard and the webhook on the same port
  const proxyPort = process.env.PROXY_PORT || 8009
  const botPort = process.env.port || process.env.PORT || 1337
  const dashboardPort = process.env.BOTPRESS_PORT || process.env.PORT || 3000
  const proxy = httpProxy.createProxyServer({})
  const router = (req, res) => {
    const url = req.url
    const matched = /\/api\/messages/.exec(url)
    if (matched) {
      proxy.web(req, res, { target: `http://127.0.0.1:${botPort}` })
    } else {
      proxy.web(req, res, { target: `http://127.0.0.1:${dashboardPort}` })
    }
  }
  http.createServer(router).listen(proxyPort)
}
