const help = () => {
  return [
    'Cliquez sur "Prochaines confs" ou entre "prochain" pour avoir la liste des prochaines conférences \n\n Entrez un mot et je rechercherai pour vous les conférences sur le sujet',
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
