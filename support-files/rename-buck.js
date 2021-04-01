const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../android/app/_BUCK')

const packageName = process.argv[2]

if (packageName) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      throw err
    }

    const result = data.replace(new RegExp(require('./references/package-name.json').value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), packageName)

    fs.writeFile(filePath, result, 'utf8', function (err) {
       if (err) {
         throw err
       }
    })
  })
} else {
  console.log('Harap memberi argument package name')
}
