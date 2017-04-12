const moment = require('moment')
const findConfById = require('./findConfById')
const formatDate = require('./formatDate')
const formatConfDuration = require('./formatConfDuration')

const confToAttachment = confInfo => {
  const formatedStartDate = formatDate(confInfo.event_start)
  const startDateUnixTime = moment(confInfo.event_start).unix()
  const formatedConfDuration = formatConfDuration(confInfo)

  return [
    `${confInfo.name}`,
    `${formatedConfDuration}, par ${confInfo.speakers}`,
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
                'value': `next ${startDateUnixTime}`
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
