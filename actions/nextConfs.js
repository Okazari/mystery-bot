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
      moment(referenceDate).add(15, 'm')
    )
  }
)

const isAfter = R.curry(
  (referenceDate, confDate) => {
    return confDate.isAfter(moment(referenceDate).subtract(10, 'm'  ))
  }
)

const getSoonestConfs = (referenceDate) => {
  const nextConfs = confs.filter(
      R.pipe(
        extractStartDate,
        isAfter(referenceDate)
      )
    )
  if (!nextConfs.length) {
    return [
      `Le breizhcamp c'est fini pour cette année :'(`,
      defaultMenu(),
    ]
  }
  const soonestConf = nextConfs.sort((a,b) => a.event_start > b.event_start ? 1 : -1).shift()
  const soonestConfDate = moment(soonestConf.event_start)
  const foundConfs = confs.filter(
    R.pipe(
      extractStartDate,
      happensNext(soonestConfDate)
    )
  )
  const startedConfs = soonestConfDate.isBefore(moment(referenceDate))
  let message = `Prochaine série de conférences: ${formatDate(soonestConfDate)}`
  if(startedConfs) {
    message = `Ces conférences ont commencé il y a moins de 10min`
  }
  const formattedConfs = formatConfList(foundConfs)
  return [
    message,
    ...formattedConfs
  ]
}

const searchConfByDate = (referenceDate) => {
  const formatedReferenceDate = formatDate(referenceDate)
  const foundConfs = confs.filter(
    R.pipe(
      extractStartDate,
      happensNext(referenceDate)
    )
  )
  console.log('FOUNDCONFS', foundConfs)
  if(!foundConfs.length) {
    return [
      `Je n'ai rien trouvé aux environs de ${formatedReferenceDate}`,
      defaultMenu(),
    ]
  } else {
    const formattedConfs = formatConfList(foundConfs)
    return [
      `Voici les conférences qui démarrent aux environs de ${formatedReferenceDate}`,
      ...formattedConfs
    ]
  }
}

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

  // En cas de recherche explicite sans résultats
  if (eventStartUnixTime) {
    return searchConfByDate(referenceDate)
  // Sinon on renvoie la prochaine série de conférences
  } else {
    return getSoonestConfs(referenceDate)
  }
}

module.exports = nextConfs
