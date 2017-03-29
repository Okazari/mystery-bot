const R = require('ramda')
const moment = require('moment')
const confs = require('../breizhcamp.json')
const currentDate = require('./currentDate')

const happensNext = confDate => {
  return confDate.isBetween(
    currentDate().subtract(5, 'm'),
    currentDate().add(20, 'm')
  )
}

const extractStartDate = R.pipe(R.prop('event_start'), moment)

const confInfoToHeroCard = confInfo => {
  return {
    'contentType': 'application/vnd.microsoft.card.hero',
    'content': {
      'title': confInfo.name,
      'subtitle': confInfo.description,
      'buttons': [
        {
          'type': 'postBack',
          'title': `${confInfo.venue}`,
          'value': `conf location ${confInfo.id}`
        },
        {
          'type': 'postBack',
          'title': 'Plus d\'infos',
          'value': `conf details ${confInfo.id}`
        }
      ]
    }
  }
}

const aggregateCards = cards => {
  return {
    'attachmentLayout': 'carousel',
    'attachments': cards
  }
}

const nextConfs = () =>
  aggregateCards(
    confs
      .filter(
        R.pipe(
          extractStartDate,
          happensNext
        )
      )
      .map(confInfoToHeroCard)
  )

module.exports = nextConfs
