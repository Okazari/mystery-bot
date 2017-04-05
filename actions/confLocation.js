const findConfById = require('./findConfById')
const plan = require('./plan')

const confLocation = confId => {
  return findConfById(confId)
    .map(plan)
    .getOrElse('La conférence n\'a pas été trouvée ¯\\\\_(ツ)_/¯')
}

module.exports = confLocation
