const R = require('ramda')
const Maybe = require('ramda-fantasy').Maybe
const confs = require('../breizhcamp.json')

const findConfById = confId =>
  R.pipe(
    R.filter(R.whereEq({'id': confId})),
    R.head,
    Maybe
  )(confs)

module.exports = findConfById
