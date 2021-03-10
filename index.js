import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import App from './sources/App'
import { name as appName } from './app.json'

import { initPushNotification } from './sources/helpers/messaging-and-notification'

initPushNotification()

AppRegistry.registerComponent(appName, () => App)
