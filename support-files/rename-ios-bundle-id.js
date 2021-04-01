const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, `../ios/${require('../package.json').name}.xcodeproj/project.pbxproj`)

const bundleID = process.argv[2]

if (bundleID) {
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      throw err
    }

    const result = data.replace(new RegExp(require('./references/package-name.json').value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), bundleID)

    fs.writeFile(filePath, result, 'utf8', function (err) {
       if (err) {
         throw err
       }
    })
  })
} else {
  console.log('Harap memberi argument package name')
}
