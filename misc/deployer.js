const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')

function promptMainMenu() {
  let hasTelegramCredential = true

  if (!fs.existsSync(path.join(__dirname, './references/telegram-credential.json'))) {
    hasTelegramCredential = false
  } else {
    const { token, chat_id } = require('./references/telegram-credential.json')

    if (token == undefined || token == '' || chat_id == undefined || chat_id == '') {
      hasTelegramCredential = false
    }
  }

  inquirer.prompt([
    {
      type: 'list',
      name: 'deployment_choice',
      message: 'APK Deployer Menu',
      choices: hasTelegramCredential ?
        [
          'Configure Telegram Credential',
          'Build APK',
          'Build APK and Deploy to Telegram Bot',
          'Deploy APK to Telegram Bot',
          'Exit'
        ]
        :
        [
          'Configure Telegram Credential',
          'Build APK',
          'Exit'
        ],
      default: 'Configure Telegram Credential'
    }
  ])
  .then(({deployment_choice}) => {
    const { spawn } = require('child_process')

    if (deployment_choice == 'Configure Telegram Credential') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'new_token',
          message: 'Telegram Bot Token :'
        },
        {
          type: 'input',
          name: 'new_chat_id',
          message: 'Chat ID :'
        }
      ])
      .then(({new_token, new_chat_id}) => {
        const json = JSON.stringify({
          token: new_token,
          chat_id: new_chat_id
        }, null, 2)

        fs.writeFile('misc/references/telegram-credential.json', json, 'utf8', () => {
          console.log('Telegram credential added')

          promptMainMenu()
        })
      })
    } else if (deployment_choice == 'Build APK') {
      spawn('npm', ['run', 'build-android'], {stdio: 'inherit'})
    } else if (deployment_choice == 'Build APK and Deploy to Telegram Bot') {
      const buildProcess = spawn('npm', ['run', 'build-android-without-open-file-location'], {stdio: 'inherit'})

      buildProcess.on('exit', () => {
        spawn('npm', ['run', 'send-file-via-telegram-bot'], {stdio: 'inherit'})
      })
    } else if (deployment_choice == 'Deploy APK to Telegram Bot') {
      spawn('npm', ['run', 'send-file-via-telegram-bot'], {stdio: 'inherit'})
    }
  })
}

promptMainMenu()
