const schedule = require('../../../services/ScheduleService')
const moment = require('moment')

const buildConfDescription = conf => {
  return conf.name + " présentée par "+ conf.speakers+ " en " + conf.venue + "\n\n" +
         conf.event_type + "\n\n" +
         conf.description

}

const buildConfsDescription = (conferences) => {
  return conferences.reduce((prev, next) => {
    return prev + "====================== \n\n" + buildConfDescription(next) + "\n\n"
  }, '')
}

module.exports = {
  triggers: [
    "next confs",
  ],
  handler: function(rs, args) {
    const nextConfs = schedule.getClosestConfs(moment('2016-03-24T15:40:00')) || []
    return "Prochaine conférences\n\n" + (nextConfs.length ? buildConfsDescription(nextConfs) : 'Pas de conférence imminente');
  }
}
