process.on('uncaughtException', function (err) {
  console.log(err)
})

require('botpress/lib/cli/start')()
