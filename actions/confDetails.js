const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe
const confs = require('../breizhcamp.json')

// TODO Gérer l'encodage

const confDetails = confId => {
  const confToAttachment = confInfo => {
    return [confInfo.description,
      {
        'attachments': [
          {
            'contentType': 'application/vnd.microsoft.card.hero',
            'content': {
              'buttons': [
                {
                  'type': 'postBack',
                  'title': 'Ou c\'est ?',
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

  const findConf = R.pipe(
    R.filter(R.whereEq({'id': confId})),
    R.head,
    Maybe
  )

  const createResult = R.pipe(
    findConf,
    R.map(confToAttachment)
  )

  return createResult(confs).getOrElse('La conférence n\'a pas été trouvée ¯\\\\_(ツ)_/¯')
}

module.exports = confDetails
