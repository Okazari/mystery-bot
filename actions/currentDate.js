const moment = require('moment')
require('moment-timezone')

module.exports = function () {
  // return moment('2017-04-19T14:11:00.000')
  return moment().add(2, 'h')
  // return moment().tz('Europe/Paris')
}
