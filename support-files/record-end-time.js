const fs = require('fs')

const json = JSON.stringify({
  ...require('./references/build-time.json'),
  endTime: (new Date()).getTime()
}, null, 2)

fs.writeFile('support-files/references/build-time.json', json, 'utf8', () => {})
