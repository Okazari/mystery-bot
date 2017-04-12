const axios = require('axios')

const accessToken = require('../config/config.json').facebook.access_token
const planUrl = 'https://raw.githubusercontent.com/Okazari/mystery-bot/botpress-botbuilder/images/plan.png'

axios.post(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`,
  {
    'persistent_menu': [
      {
        'locale': 'default',
        'composer_input_disabled': false,
        'call_to_actions': [
          {
            'type': 'postBack',
            'title': 'Prochaines confs',
            'payload': 'next'
          },
          {
            'type': 'postBack',
            'title': 'Aide',
            'payload': 'help'
          },
          {
            'type': 'web_url',
            'title': 'Plan',
            'url': planUrl,
            'webview_height_ratio': 'full'
          }
        ]
      }
    ]
  })
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
