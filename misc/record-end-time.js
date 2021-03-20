const fs = require('fs')

const json = JSON.stringify({
  ...require('./references/build-time.json'),
  endTime: (new Date()).toString()
}, null, 2)

fs.writeFile('misc/references/build-time.json', json, 'utf8', () => {})
