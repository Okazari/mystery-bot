const R = require('ramda')
const chrono = require('chrono-node')
const moment = require('moment')

const lunr = require('lunr')
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.fr')(lunr)

const formatConfList = require('./formatConfList')
const defaultMenu = require('./defaultMenu')
const currentDate = require('./currentDate')
const nextConfs = require('./nextConfs')
const confs = require('../breizhcamp.json')

const index = lunr(function () {
  this.use(lunr.fr)
  this.field('name', { boost: 10 })
  this.field('description')
  this.field('speakers')
})
confs.forEach(conf => index.add(conf))

const searchConfs = search => {
  // Search for date
  const date = chrono.parseDate(search, currentDate())
  if (date) {
    const unixTime = moment(date).unix()
    return nextConfs(unixTime)
  }

  // Search for keyword
  const results = index.search(search)
  const foundConfIds = R.pluck('ref', results)
  const foundConfs = R.filter(conf => R.contains(conf.id, foundConfIds), confs)

  if (foundConfs.length) {
    const formattedConfs = formatConfList(foundConfs)
    return [
      `Voici ce que j'ai trouvé pour "${search}"`,
      ...formattedConfs
    ]
  } else {
    return [
      `Je n'ai rien trouvé pour "${search}"`,
      defaultMenu()
    ]
  }
}

module.exports = searchConfs
