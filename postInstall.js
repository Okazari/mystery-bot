const {init, decrypt} = require('sekret')

const password = process.env.SEKRETPASS
if (password) {
  init(password)
  decrypt('config/config.json')
} else {
  throw new Error('cannot find SEKRETPASS env var')
}
