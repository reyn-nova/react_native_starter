const fs = require('fs')

const json = JSON.stringify({
  startTime: (new Date()).getTime(),
  endTime: null
}, null, 2)

fs.writeFile('support-files/references/build-time.json', json, 'utf8', () => {})
