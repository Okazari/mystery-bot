
const defaultMenu = require('./defaultMenu')

const hello = () => {
  return [
    'Bonjour, je m\'appelle BreizhBot !',
    'Cliquez sur "Prochaines confs" pour connaître la liste des prochaines conférences \n\n Tapez un mot, par exemple "microservice", et je rechercherai pour vous les conférences sur le sujet',
    defaultMenu()]
}

module.exports = hello
