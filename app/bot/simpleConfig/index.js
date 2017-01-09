module.exports = function (vorpal) {
	const mapping = require('./bot.json')

	vorpal
		.command('message [words...]')
		.description('Simple question/reponse basé sur une config JSON')
		.action(function (args, callback) {
			const message = args.words.join(' ').toLowerCase()
			const response = mapping[message] 
			if(callback){
				callback(response)
			}
			return response
		})
}