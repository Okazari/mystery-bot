const axios = require('axios')

const accessToken = require('../config/config.json').facebook.access_token

axios.post(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${accessToken}`,
  {
    'get_started': {
      'payload': 'salut'
    }
  })
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
