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

const confInfoToButton = confInfo => {
  return {
    'type': 'Button',
    'name': confInfo.name,
    'url': `conf ${confInfo.id}`
  }
}

const aggregateButtons = buttons => {
  return {
    'type': 'Note',
    'name': 'Voici les prochaines conférences !',
    'content': '',
    'attachment': buttons
  }
}

const nextConfs = () =>
  // 4- AGGREGATE BUTTONS IN ONE MESSAGE
  aggregateButtons(
    // 3- TRANSFORM THEM TO BUTTON
    R.map(
      confInfoToButton,
      // 2- FILTER THE NEXT ONES
      R.filter(
        R.pipe(
          extractStartDate,
          happensNext
        ),
        // 1- GET CONF INFOS
        confs
      )
    )
  )

module.exports = nextConfs
