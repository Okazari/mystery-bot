const R = require('ramda')
const moment = require('moment')
const confs = require('../breizhcamp.json')
const currentDate = require('./currentDate')
const formatConfList = require('./formatConfList')
const formatDate = require('./formatDate')
const extractStartDate = require('./extractStartDate')
const defaultMenu = require('./defaultMenu')

const breizhcampStartDate = moment('2017-04-19T10:00:00.000')

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

  // Special case : Before the BreizhCamp opening
  // if (breizhcampStartDate.isAfter(referenceDate)) {
  //   const firstConfs = nextConfs(breizhcampStartDate.unix())
  //   return [
  //     'Le BreizhCamp 2017 ouvre ses portes le mercredi 19 avril à 10h !',
  //     ...firstConfs
  //   ]
  // }

  const formatedReferenceDate = formatDate(referenceDate)

  const foundConfs = confs
        .filter(
          R.pipe(
            extractStartDate,
            happensNext(referenceDate)
          )
        )

  if (foundConfs.length) {
    const formattedConfs = formatConfList(foundConfs)
    return [
      `Voici les conférences qui démarrent aux environs de ${formatedReferenceDate}`,
      ...formattedConfs
    ]
  } else {
    return [
      `Je n'ai rien trouvé aux environs de ${formatedReferenceDate}`,
      defaultMenu()
    ]
  }
}

module.exports = nextConfs
