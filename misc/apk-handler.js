const fs = require('fs')
const path = require('path')
// const open = require('open')
const pretty = require('prettysize')
const { selectedBaseURL } = require('../sources/references/base-url')
const { default: axios } = require('axios')

const folderPath = path.join(__dirname, '../android/app/build/outputs/apk/release/')

const originalAPKPath = folderPath + 'app-release.apk'

if (fs.existsSync(originalAPKPath)) {
  const newFilename = require('../package.json').name + '-v' + require('../package.json').version + '-' + selectedBaseURL + '.apk'

  const newAPKPath = folderPath + newFilename

  fs.rename(originalAPKPath, newAPKPath, function (err) {
    if (err) {
      throw err
    }

    console.log('APK Handler: Successfully renamed APK!')

    // open(newAPKPath) // Need testing this

    console.log('Processing file upload with size ' + pretty(fs.statSync(newAPKPath).size)) + ' file'

    sendFileViaTelegramBot(newFilename, newAPKPath)
  })
} else {
  console.log('APK Handler: Path file to ' + originalAPKPath + ' not found')
}

function sendFileViaTelegramBot(filename, filepath) {
  const fileBuffer = fs.readFileSync(filepath)

  const FormData = require('form-data')

  const formData = new FormData()

  const chat_id = -439125115

  // Reynald: 811006569
  // Group Crocodic | React Native: -439125115

  formData.append('chat_id', chat_id)
  formData.append('caption', 'Build success')
  formData.append('document', fileBuffer, { filename, knownLength: fs.statSync(filepath).size })

  const token = '1685554932:AAEfH8pWySl2mfbgPZnTrkJnAeC1EpN3xwA'

  const loading =  require('loading-cli')

  let isDone = false
  const startTime = new Date()

  const load = loading(`${(0).toFixed(2)}s`).start()

  function counting() {
    setTimeout(function(){
      const time = ((new Date()).getTime() - startTime.getTime()) / 1000

      load.text = `Upload time: ${time.toFixed(2)}s`

      if (!isDone) {
        counting()
      } else {
        load.stop()

        console.log(`Upload done in ${time.toFixed(2)}s`)
      }
    }, 10)
  }

  counting()

  axios.create({
    headers: formData.getHeaders(),
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  }).post(
    `https://api.telegram.org/bot${token}/sendDocument`,
    formData
  )
  .then(response => {
    const { message_id, caption } = response.data.result
    isDone = true

    const time = ((new Date()).getTime() - startTime.getTime()) / 1000

    axios.post(`https://api.telegram.org/bot${token}/editMessageCaption`, {
      chat_id,
      message_id,
      caption: `${caption}\n\nUpload time: ${time.toFixed(2)}s`
    })
    .then(function () {

    })
    .catch(function () {

    })
  })
  .catch(err => {
    isDone = true

    throw err
  })
}
