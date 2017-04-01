const findConfById = require('./findConfById')
const formatDate = require('./formatDate')

// TODO Gérer l'encodage

const confToAttachment = confInfo => {
  const formatedStartDate = formatDate(confInfo.event_start)

  return [
    `Par ${confInfo.speakers} :`,
    confInfo.description,
    {
      'attachments': [
        {
          'contentType': 'application/vnd.microsoft.card.hero',
          'content': {
            'buttons': [
              {
                'type': 'postBack',
                'title': `${formatedStartDate}`,
                // TODO Appeler next 'date de la conf'
                'value': `conf details ${confInfo.id}`
              },
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
