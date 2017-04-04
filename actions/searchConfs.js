const R = require('ramda')
const confs = require('../breizhcamp.json')
const formatConfList = require('./formatConfList')
const defaultMenu = require('./defaultMenu')

const lunr = require('lunr')
require('lunr-languages/lunr.stemmer.support')(lunr)
require('lunr-languages/lunr.fr')(lunr)

const index = lunr(function () {
  this.use(lunr.fr)
  this.field('name', { boost: 10 })
  this.field('description')
  this.field('speakers')
})
confs.forEach(conf => index.add(conf))

const searchConfs = search => {
  const results = index.search(search)
  const foundConfIds = R.pluck('ref', results)
  const foundConfs = R.filter(conf => R.contains(conf.id, foundConfIds), confs)

  if (foundConfs.length) {
    return [
      `Voici ce que j'ai trouvé pour "${search}"`,
      formatConfList(foundConfs)
    ]
  } else {
    return [
      `Je n'ai rien trouvé pour "${search}"`,
      defaultMenu()
    ]
  }
}

module.exports = searchConfs
