const findConfById = require('./findConfById')

// TODO Gérer l'encodage

const confToAttachment = confInfo => {
  return [
    confInfo.speakers,
    confInfo.description,
    {
      'attachments': [
        {
          'contentType': 'application/vnd.microsoft.card.hero',
          'content': {
            'buttons': [
              {
                'type': 'postBack',
                'title': `${confInfo.venue}`,
                'value': `conf location ${confInfo.id}`
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

const confDetails = confId => {
  return findConfById(confId)
    .map(confToAttachment)
    .getOrElse('La conférence n\'a pas été trouvée ¯\\\\_(ツ)_/¯')
}

module.exports = confDetails
