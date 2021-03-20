const inquirer = require('inquirer')

const { renameAPK } = require('./apk-handler')

inquirer.prompt([
  {
    type: 'list',
    name: 'deployment_choice',
    message: 'APK Deployment Menu',
    choices: [
      'Configure Telegram Bot',
      'Build APK',
      'Build APK and Deploy to Telegram Bot',
      'Deploy APK to Telegram Bot',
      'Exit'
    ],
    default: 'Configure Telegram Bot'
  }
])
.then(({deployment_choice}) => {
  if (deployment_choice == 'Configure Telegram Bot') {

  } else if (deployment_choice == 'Build APK') {

  } else if (deployment_choice == 'Build APK and Deploy to Telegram Bot') {
    renameAPK()
  } else if (deployment_choice == 'Deploy APK to Telegram Bot') {

  }
})
