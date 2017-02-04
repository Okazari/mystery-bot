let visitors = 0
const schedule = require('../../../mock/schedule.json')
module.exports = {
  triggers: [
    "hello",
  ],
  handler: function(rs, args) {
    var text = args.join(" ");
    return "Bonjour ! Vous êtes le visiteur n°" + (++visitors);
  }
}
