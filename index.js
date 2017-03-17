const {init, ready} = require('./botpress-broid')
const brain = require('./brain')

// Example of received message from broid-messenger

/*
{ '@context': 'https://www.w3.org/ns/activitystreams',
  generator:
   { id: '0edfd3f6-2b93-483a-a093-4489bdf70a16',
     name: 'messenger',
     type: 'Service' },
  published: 1489086630,
  type: 'Create',
  actor:
   { id: '1333093036762478',
     name: 'Antoine Cailly',
     type: 'Person' },
  target:
   { id: '1333093036762478',
     name: '1333093036762478',
     type: 'Person' },
  object:
   { content: 'tzetetztez',
     id: 'mid.$cAAC6uSXsk4Jg5cAQ0VatHrQ-1aD2',
     type: 'Note' } }
*/

module.exports = function (bp) {
  init(bp)
  bp.middlewares.load()
  ready(bp)

  bp.hear({platform: 'broid', type: 'message'}, (event, next) => {
    // console.log('EVENT !', event)

    const {target, generator, object: {content}} = event.raw

    const callback = (object) => {
      const channelInfo = {
        generator,
        to: target
      }
      bp.broid.sendText(channelInfo, object)
    }

    const userId = target.id
    brain.send(userId, content, callback)
  })
}
