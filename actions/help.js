const help = () => {
  return [
    'Cliquez sur "Prochaines confs" pour connaître la liste des prochaines conférences \n\n Tapez un mot, par exemple "microservice", et je rechercherai pour vous les conférences sur le sujet',
    {
      'attachments': [
        {
          'contentType': 'application/vnd.microsoft.card.hero',
          'content': {
            'buttons': [
              {
                'type': 'postBack',
                'title': 'Qui est BreizhBot ?',
                'value': 'about'
              }
            ]
          }
        }
      ]
    }
  ]
}

module.exports = help
