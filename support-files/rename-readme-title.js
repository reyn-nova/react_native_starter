const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../README.md')

const title = process.argv[2]

if (title) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      throw err
    }

    const result = data.replace(`# ${require('../package.json').name.replace(/\b\w/g, l => l.toUpperCase())}`, `# ${title}`)

    fs.writeFile(filePath, result, 'utf8', function (err) {
       if (err) {
         throw err
       }
    })
  })
} else {
  console.log('Harap memberi argument package name')
}
