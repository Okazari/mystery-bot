const actions = require('./actions')
const {init, ready} = require('./botpress-broid')

module.exports = function (bp) {
  init(bp)
  bp.middlewares.load()
  ready(bp)

  // registering scripts to bp (available in rivescript)
  bp.actions = actions

  bp.hear({type: 'message'}, (event, next) => {
    console.log('EVENT !', event)
    bp.broid.sendText(event.raw)
  })
}
