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

const nextConfs = () => R.filter(
  R.pipe(
    extractStartDate,
    happensNext
  ),
  confs)

module.exports = nextConfs
