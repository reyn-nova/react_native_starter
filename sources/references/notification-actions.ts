import { Alert, Platform, Vibration } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

export function OnGetToken(token: string) {
  console.log(`Token ${Platform.OS}: ${token}`)
}

export function OnMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage, from: 'Foreground' | 'Background') {
  if (from == 'Foreground') {
    ShowForegroundNotification(remoteMessage)
  }
} 

export function OnNotificationTap(notificationData: any) {
  ExecuteNotificationData(notificationData)
}

export function ExecuteNotificationData(notificationData: any) {
  Alert.alert('Data', JSON.stringify(notificationData, null, 2))
}

function ShowForegroundNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  const { data, notification } = remoteMessage
  
  if (Platform.OS == 'android') {
    PushNotification.localNotification({
      title: notification?.title,
      message: notification?.body as string,
      channelId: 'default',
      playSound: true,
      soundName: 'default',
      importance: 'high',
      priority: 'high',
      vibrate: true,
      userInfo: data,
      group: 'group',
      groupSummary: true
    })
  } else {
    Vibration.vibrate([400])

    Toast.show({
      text1: notification?.title,
      text2: notification?.body as string,
      type: 'info',
      onPress: () => {
        OnNotificationTap(data)

        Toast.hide()
      }
    })
  }
}