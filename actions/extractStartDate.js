const R = require('ramda')
const moment = require('moment')

const extractStartDate = R.pipe(
  R.prop('event_start'),
  moment
)

module.exports = extractStartDate
