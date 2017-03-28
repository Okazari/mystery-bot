
const hello = () => {
  return {
    'attachments': [
      {
        'contentType': 'application/vnd.microsoft.card.hero',
        'content': {
          'title': 'Bonjour, je m\'appelle BreizhBot',
          'subtitle': 'Que voulez vous savoir ?',
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
            }
          ]
        }
      }
    ]
  }
}

module.exports = hello
