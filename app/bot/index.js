const vorpal = require('vorpal')()
const chalk = vorpal.chalk
const simpleConfig = require('./simpleConfig')
const rivescript = require('./rivescript')

vorpal.use(simpleConfig)
vorpal.use(rivescript)
    
vorpal
	.delimiter(chalk.magenta('mystery-bot~$'))

const bot = {
	cli: () => vorpal.show(),
	send: (message) => vorpal.execSync(message)
}

module.exports = bot