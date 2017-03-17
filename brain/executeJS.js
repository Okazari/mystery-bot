const regex = /^js: (.+)/i

const executeJS = (brain, replied) => {
  const match = regex.exec(replied)

  if (match) {
    const body = match[1]
    const fn = new Function('brain', body)
    return fn(brain)
  }

  return replied
}

module.exports = executeJS
