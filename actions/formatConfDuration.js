const moment = require('moment')

const formatConfDuration = confInfo => {
  const diffInMs = moment(confInfo.event_end).diff(moment(confInfo.event_start))
  const duration = moment.duration(diffInMs).humanize()
  return duration
}

module.exports = formatConfDuration
