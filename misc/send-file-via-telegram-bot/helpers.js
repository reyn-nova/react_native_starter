const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const pretty = require('prettysize')

const { newAPKPath: filepath, newFilename: filename } = require('../references/apk-path')

function sendFileViaTelegramBot() {
  if (!fs.existsSync(path.join(__dirname, '../references/telegram-credential.json'))) {
    console.log('Telegram credential is invalid, please configure using npm run deployer')

    return
  }

  const { token, chat_id } = require('../references/telegram-credential.json')

  if (token == undefined || token == '' || chat_id == undefined || chat_id == '') {
    console.log('Telegram credential is invalid, please configure using npm run deployer')

    return
  }

  if (!fs.existsSync(filepath)) {
    console.log(`Build file of ${filename} not found`)

    return
  }

  console.log('Processing file upload with size ' + pretty(fs.statSync(filepath).size)) + ' file'

  const fileBuffer = fs.readFileSync(filepath)

  const formData = new FormData()

  // Reynald: 811006569
  // Group Crocodic | React Native: -439125115

  formData.append('chat_id', chat_id)

  let chatCaption = 'Build success\n'

  if (fs.existsSync(path.join(__dirname, '../references/build-time.json'))) {
    if (require('../references/build-time.json').startTime != '' && require('../references/build-time.json').endTime != '') {
      const buildStartTime = (new Date(require('../references/build-time.json').startTime)).getTime()
      const buildEndTime = (new Date(require('../references/build-time.json').endTime)).getTime()

      chatCaption += `\nBuild time: ${((buildEndTime - buildStartTime) / 1000).toFixed(2)}s`
    }
  }

  formData.append('caption', `${chatCaption}`)
  formData.append('document', fileBuffer, { filename, knownLength: fs.statSync(filepath).size })

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
    const { message_id } = response.data.result
    isDone = true

    const time = ((new Date()).getTime() - startTime.getTime()) / 1000

    axios.post(`https://api.telegram.org/bot${token}/editMessageCaption`, {
      chat_id,
      message_id,
      caption: `${chatCaption}\nUpload time: ${time.toFixed(2)}s`
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
