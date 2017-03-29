const R = require('ramda')
const stopwords = require('stopword')
const frenchStopWords = stopwords.fr
const confs = require('../breizhcamp.json')
const formatConfList = require('./formatConfList')

const extractKeywords = text => {
  if (!text) return []
  const keywords = stopwords.removeStopwords(text.split(' '), frenchStopWords)
  return keywords.map(R.toLower)
}

const fieldContainingKeywords = [
  'name',
  'description',
  'speakers'
]

const extractConfKeywords = conf => fieldContainingKeywords
  .reduce((acc, field) => {
    const keywords = extractKeywords(conf[field])
    return acc.concat(keywords)
  }, [])

const extractAllConfKeywords = confs => confs.reduce((acc, conf) => {
  const confKeywords = extractConfKeywords(conf)
  return acc.concat({conf, confKeywords})
}, [])

// TODO Strict comparison return different results if we search 'microservice' or 'microservices'. And return nothing if we search 'micro'
const isConfRelevant = (confKeywords, searchKeywords) => {
  return R.all(
    searchKeyword => R.contains(searchKeyword, confKeywords),
    searchKeywords
  )
}

const searchConfs = search => {
  const searchKeywords = extractKeywords(search)

  const allConfKeywords = extractAllConfKeywords(confs)

  const filteredConfs = allConfKeywords
    .filter(({confKeywords}) => isConfRelevant(confKeywords, searchKeywords))
    .map(({conf}) => conf)

  return formatConfList(filteredConfs)
}

module.exports = searchConfs
