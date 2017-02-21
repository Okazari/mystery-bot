const actions = require('./actions')

module.exports = function(bp) {
  bp.middlewares.load()
  
  //registering scripts to bp (available in rivescript)
  bp.actions = actions
}
