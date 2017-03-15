const handlePromise = (next, promise) => {
  return promise.then(res => {
    next()
    return res
  })
  .catch(err => {
    next(err)
    throw err
  })
}

const handleText = (event, next, broid) => {
  if (event.platform !== 'broid' || event.type !== 'text') {
    return next()
  }

  return handlePromise(next, broid.send(event.raw))
}

module.exports = {
  'text': handleText
}
