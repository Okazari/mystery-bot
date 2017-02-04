const RiveScript = require('rivescript')

const scripts = require('./scripts')

const brain = new RiveScript({utf8: true})
brain.loadFile("./app/bot/rivescript/brain.rive", loading_done, loading_error)

for (let callable in scripts) {
	if (!scripts.hasOwnProperty(callable)) continue;

	// Map the trigger texts to the `<call>` command for the callable.
	for (let i in scripts[callable].triggers) {
		brain.stream("+ " + scripts[callable].triggers[i] + "\n"
			+ "- <call>" + callable + " " + scripts[callable].args + "</call>\n"
		);
	}

	// Register the JavaScript object macro.
	brain.setSubroutine(callable, scripts[callable].handler);
}

function loading_done(batch_num){
    brain.sortReplies()
}

function loading_error(error){
    console.log("Error when loading RiveScript files: " + error)
}

const reply = (message) => {
	return brain.replyAsync("local-user", message)
}

module.exports = function (vorpal) {
	vorpal
		.command('rivescript [words...]')
		.alias('rs')
		.description('Démo d\'un bot RiveScript')
		.action(function (args, callback) {
			const message = args.words.join(' ').toLowerCase()
			return reply(message)
		})
}
