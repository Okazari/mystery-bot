const siteUrl = 'http://www.breizhcamp.org/conference/programme/'

const defaultMenu = () => {
  return {
    'attachments': [
      {
        'contentType': 'application/vnd.microsoft.card.hero',
        'content': {
          'title': 'Que voulez vous savoir ?',
          'buttons': [
            {
              'type': 'postBack',
              'title': 'Prochaines confs',
              'value': 'next'
            },
            {
              'type': 'postBack',
              'title': 'Aide',
              'value': 'help'
            },
            {
              'type': 'openUrl',
              'title': 'Programme en ligne',
              'value': siteUrl
            }
          ]
        }
      }
    ]
  }
}

module.exports = defaultMenu
