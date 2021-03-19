const fs = require('fs')
const path = require('path')
const { selectedBaseURL: baseUrl } = require('../sources/references/base-url')

const folderPath = path.join(__dirname, '../android/app/build/outputs/apk/release/')

const originalAPKPath = folderPath + 'app-release.apk'

if (fs.existsSync(originalAPKPath)) {
  const newAPKPath = folderPath + require('../package.json').name + '-v' + require('../package.json').version + '-' + baseUrl + '.apk'

  fs.rename(originalAPKPath, newAPKPath, function (err) {
    if (err) {
      throw err
    }

    console.log('APK Renamer: Successfully renamed APK!')
  })
} else {
  console.log('APK Renamer: Path file to ' + originalAPKPath + ' not found')
}
