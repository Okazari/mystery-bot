const planUrl = 'https://raw.githubusercontent.com/Okazari/mystery-bot/botpress-botbuilder/images/plan.png'

const plan = confInfo => {
  const buttons = []

  buttons.push({
    'type': 'openUrl',
    'title': 'Ouvrir en grand',
    'value': planUrl
  })

  if (confInfo) {
    buttons.push({
      'type': 'postBack',
      'title': 'Description',
      'value': `conf details ${confInfo.id}`
    })
  }

  buttons.push({
    'type': 'postBack',
    'title': 'Prochaines confs',
    'value': 'next'
  })

  return [
    {
      'attachments': [
        {
          'contentType': 'application/vnd.microsoft.card.hero',
          'content': {
            'images': [
              {
                'url': planUrl
              }
            ],
            'buttons': buttons
          }
        }]
    }]
}

module.exports = plan
