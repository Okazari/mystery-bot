const schedule = require('../mock/schedule.json')
const moment = require('moment')
class ScheduleService {

  getClosestConfs(date) {
    return schedule.filter(conf => {
      return moment(conf.event_start).isBetween(moment(date).subtract(5, 'm'), moment(date).add(20, 'm'), null , [])
    })
  }

}

module.exports = new ScheduleService()
