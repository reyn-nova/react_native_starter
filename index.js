import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import App from './sources/App'
import { name as appName } from './app.json'

import { OnNotificationTap } from './sources/references/notification-actions'
import { InitPushNotification } from './sources/helpers/messaging-and-notification'

InitPushNotification({
  onNotification: notificationData => OnNotificationTap(notificationData)
})

AppRegistry.registerComponent(appName, () => App)
