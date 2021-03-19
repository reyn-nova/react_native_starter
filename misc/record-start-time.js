const fs = require('fs')

const json = JSON.stringify({
  startTime: (new Date()).toString(),
  endTime: ''
})

fs.writeFile('misc/references/build-time.json', json, 'utf8', () => {})
