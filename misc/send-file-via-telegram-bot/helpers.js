const fs = require('fs')
const FormData = require('form-data')
const pretty = require('prettysize')

const { newAPKPath: filepath, newFilename: filename } = require('../references/apk-path')

function sendFileViaTelegramBot() {
  console.log('Processing file upload with size ' + pretty(fs.statSync(filepath).size)) + ' file'

  const fileBuffer = fs.readFileSync(filepath)

  const formData = new FormData()

  const chat_id = 811006569

  // Reynald: 811006569
  // Group Crocodic | React Native: -439125115

  formData.append('chat_id', chat_id)

  const buildStartTime = (new Date(require('../references/build-time.json').startTime)).getTime()
  const buildEndTime = (new Date(require('../references/build-time.json').endTime)).getTime()

  formData.append('caption', `Build success\n\nBuild time: ${((buildEndTime - buildStartTime) / 1000).toFixed(2)}s`)
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

  const { default: axios } = require('axios')

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
      caption: `${caption}\nUpload time: ${time.toFixed(2)}s`
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

module.exports = {
  sendFileViaTelegramBot
}
