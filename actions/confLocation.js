const findConfById = require('./findConfById')

const planUrl = 'https://raw.githubusercontent.com/Okazari/mystery-bot/botpress-botbuilder/images/plan.png'

const confToAttachment = confInfo => {
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
            'buttons': [
              {
                'type': 'openUrl',
                'title': 'Ouvrir en grand',
                'value': planUrl
              },
              {
                'type': 'postBack',
                'title': 'Description',
                'value': `conf details ${confInfo.id}`
              },
              {
                'type': 'postBack',
                'title': 'Prochaines confs',
                'value': 'next'
              }
            ]
          }
        }]
    }]
}

const confLocation = confId => {
  return findConfById(confId)
    .map(confToAttachment)
    .getOrElse('La conférence n\'a pas été trouvée ¯\\\\_(ツ)_/¯')
}

module.exports = confLocation
