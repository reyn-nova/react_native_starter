const fs = require('fs')

const { folderPath, newAPKPath } = require('./references/apk-path')

renameAPK()

function renameAPK() {
  const originalAPKPath = folderPath + 'app-release.apk'

  if (fs.existsSync(originalAPKPath)) {

    fs.rename(originalAPKPath, newAPKPath, function (err) {
      if (err) {
        throw err
      }

      console.log('APK Renamer: Successfully renamed APK!')
    })
  } else {
    console.log('APK Renamer: Path file to ' + originalAPKPath + ' not found')
  }
}
