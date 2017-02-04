const RiveScript = require('rivescript')

const brain = new RiveScript({utf8: true})
brain.loadFile("./app/bot/rivescript/brain.rive", loading_done, loading_error)

function loading_done(batch_num){
    brain.sortReplies()
}

function loading_error(error){
    console.log("Error when loading RiveScript files: " + error)
}

const reply = (message) => {
	return brain.reply("local-user", message)
}

module.exports = function (vorpal) {

	vorpal
		.command('rivescript [words...]')
		.alias('rs')
		.description('Démo d\'un bot RiveScript')
		.action(function (args, callback) {
			const message = args.words.join(' ').toLowerCase()
			const response = reply(message) 
			if(callback){
				callback(response)
			}
			return response
		})
}