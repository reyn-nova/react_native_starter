const fs = require('fs')

const { folderPath, newAPKPath } = require('../references/apk-path')

function renameAPK() {
  // const open = require('open')

  const originalAPKPath = folderPath + 'app-release.apk'

  if (fs.existsSync(originalAPKPath)) {

    fs.rename(originalAPKPath, newAPKPath, function (err) {
      if (err) {
        throw err
      }

      console.log('APK Handler: Successfully renamed APK!')

      // open(newAPKPath) // Need testing this
    })
  } else {
    console.log('APK Handler: Path file to ' + originalAPKPath + ' not found')
  }
}

module.exports = {
  renameAPK
}
