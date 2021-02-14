import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import App from './sources/App'
import { name as appName } from './app.json'

import NotificationActions from './sources/helpers/notification-actions'
import { InitPushNotification } from './sources/helpers/messaging-and-notification'

InitPushNotification({
  onNotification: notificationData => NotificationActions(notificationData)
})

AppRegistry.registerComponent(appName, () => App)
