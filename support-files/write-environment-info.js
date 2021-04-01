const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const filePath = path.join(__dirname, '../ENVIRONMENT_USED.md')

let message = ''

const getInfoProcess = exec('npx react-native info')

getInfoProcess.stdout.on('data', jsonString => message += jsonString)

getInfoProcess.on('exit', () => {
  const environmentInfo = '\n' + message.split('\n').slice(1).join('\n')

  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      throw err
    }

    const result = data.replace('ENVIRONMENT_INFO', environmentInfo)

    fs.writeFile(filePath, result, 'utf8', function (err) {
      if (err) {
        throw err
      }
    })
  })
})
