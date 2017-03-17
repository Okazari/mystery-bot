const vorpal = require('vorpal')()
const brain = require('./brain')

vorpal
  .command('brain <words...>', 'Test RiveScript brain')
  .action(function (args, callback) {
    const message = args.words.join(' ')
    brain.reply('debug', message, callback)
  })

vorpal
  .delimiter('breizhbot$')
  .show()
