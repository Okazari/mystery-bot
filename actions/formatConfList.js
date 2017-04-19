const moment = require('moment')
const R = require('ramda')
const formatDate = require('./formatDate')
const formatConfDuration = require('./formatConfDuration')

const confInfoToHeroCard = confInfo => {
  const formatedStartDate = formatDate(confInfo.event_start)
  const startDateUnixTime = moment(confInfo.event_start).unix()
  const formatedConfDuration = formatConfDuration(confInfo).toUpperCase()

  return {
    'contentType': 'application/vnd.microsoft.card.hero',
    'content': {
      'title': confInfo.name,
      'subtitle': `${formatedConfDuration} - ${confInfo.description}`,
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
          'title': 'Plus d\'infos',
          'value': `conf details ${confInfo.id}`
        }
      ]
    }
  }
}

// See https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/cards-CarouselCards#outcome
const cardCountLimit = 10

const aggregateCards = allCards => {
  return R.splitEvery(cardCountLimit, allCards).map(cards => {
    return {
      'attachmentLayout': 'carousel',
      'attachments': cards
    }
  })
}

const formatConfList = confs => {
  return aggregateCards(
    confs
      .map(confInfoToHeroCard)
  )
}

module.exports = formatConfList
