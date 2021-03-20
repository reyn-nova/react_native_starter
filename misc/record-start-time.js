const fs = require('fs')

const json = JSON.stringify({
  startTime: (new Date()).toString(),
  endTime: ''
}, null, 2)

fs.writeFile('misc/references/build-time.json', json, 'utf8', () => {})
