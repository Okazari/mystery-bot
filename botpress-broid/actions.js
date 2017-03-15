const createText = (raw) => {
  const {generator, object: {content, context}, target} = raw

  const message = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    'type': 'Create',
    generator,
    'object': {
      'type': 'Note',
      'content': 'You said ' + content,
      context
    },
    'to': target
  }

  return {
    platform: 'broid',
    type: 'text',
    text: 'TOTO',
    raw: message
  }
}

module.exports = {
  createText
}
