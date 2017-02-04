const vorpal = require('vorpal')()
const chalk = vorpal.chalk
const simpleConfig = require('./simpleConfig')

vorpal.use(simpleConfig)
    
vorpal
	.delimiter(chalk.magenta('mystery-bot~$'))

const bot = {
	cli: () => vorpal.show(),
	send: (message) => vorpal.execSync(message)
}

module.exports = bot