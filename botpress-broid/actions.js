const createText = (channelInfo, object) => {
  const message = Object.assign({},
    {
      '@context': 'https://www.w3.org/ns/activitystreams',
      'type': 'Create'
    },
   channelInfo,
   {object}
  )

  return {
    platform: 'broid',
    type: 'text',
    text: 'broid',
    raw: message
  }
}

module.exports = {
  createText
}
