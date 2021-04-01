const path = require('path')

const { selectedBaseURL } = require('../../sources/references/base-url')

const folderPath = path.join(__dirname, '../../android/app/build/outputs/apk/release/')
const newFilename = require('../../package.json').name + '-v' + require('../../package.json').version + '-' + selectedBaseURL + '.apk'

module.exports = {
  folderPath,
  newFilename,
  newAPKPath: folderPath + newFilename
}
