const moment = require('moment')

module.exports = function () {
  // return moment('2017-04-21T13:00:00.000')
  return moment().utc()
}
