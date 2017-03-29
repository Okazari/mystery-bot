const findConfById = require('./findConfById')

const confToAttachment = confInfo => {
  return ['TODO Ajouter le plan',
    {
      'attachments': [
        {
          'contentType': 'application/vnd.microsoft.card.hero',
          'content': {
            'buttons': [
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
