
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

const formatConfList = confs => {
  return aggregateCards(
    confs
      .map(confInfoToHeroCard)
  )
}

module.exports = formatConfList
