module.exports = function(bp) {
  bp.middlewares.load()
  bp.hear({ platform: 'discord'}, event => {
    bp.discord.sendText(event.channel.id, "Welcome!")
  })
  bp.hear({ platform: 'facebook'}, (event, next) => {
    bp.messenger.sendText(event.user.id, 'Welcome on Botpress!!!')
  })
}
