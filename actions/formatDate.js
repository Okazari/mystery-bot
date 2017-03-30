const moment = require('moment')

const startDateFormat = 'dddd k:mm'
const formatDate = startDate => moment(startDate).format(startDateFormat)

module.exports = formatDate
