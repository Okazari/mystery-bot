const R = require('ramda')
const moment = require('moment')
const confs = require('../breizhcamp.json')
const currentDate = require('./currentDate')
const formatConfList = require('./formatConfList')
const formatDate = require('./formatDate')
const extractStartDate = require('./extractStartDate')
const defaultMenu = require('./defaultMenu')

const happensNext = R.curry(
  (referenceDate, confDate) => {
    return confDate.isBetween(
      moment(referenceDate).subtract(5, 'm'),
      moment(referenceDate).add(20, 'm')
    )
  }
)

const nextConfs = eventStartUnixTime => {
  const referenceDate = eventStartUnixTime ? moment.unix(eventStartUnixTime) : currentDate()
  const formatedReferenceDate = formatDate(referenceDate)

  const foundConfs = confs
        .filter(
          R.pipe(
            extractStartDate,
            happensNext(referenceDate)
          )
        )

  if (foundConfs.length) {
    return [
      `Voici les conférences qui démarrent aux environs de ${formatedReferenceDate}`,
      formatConfList(foundConfs)
    ]
  } else {
    return [
      `Je n'ai rien trouvé aux environs de ${formatedReferenceDate}`,
      defaultMenu()
    ]
  }
}

module.exports = nextConfs
