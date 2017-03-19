
const hello = () => {
  return {
    'type': 'Note',
    'name': 'Bonjour, je m\'appelle BreizhBot',
    'content': 'Que voulez vous savoir ?',
    'attachment': [{
      'type': 'Button',
      'name': 'Prochaines confs',
      'url': 'next'
    }, {
      'type': 'Button',
      'name': 'Aide',
      'url': 'help'
    }]
  }
}

module.exports = hello
