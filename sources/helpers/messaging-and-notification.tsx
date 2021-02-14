import React from 'react'
import { AppState, Platform, Vibration } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'

type PropsType = {
  onGetToken: (token: string) => void
  onNotification: (notificationData: any) => void
}

export default class MessageListener extends React.Component<PropsType> {
  unsubcribeForegroundMessageListener: (() => void) | undefined

  async componentDidMount() {
    this.unsubcribeForegroundMessageListener = await this.startListeningForegroundMessage()

    const token = await this.getToken()

    this.props.onGetToken(token)
  }

  render() {
    return null
  }

  componentWillUnmount() {
    if (this.unsubcribeForegroundMessageListener != undefined) {
      this.unsubcribeForegroundMessageListener()
    }
  }

  async startListeningForegroundMessage() {
    let isPermitted = false
  
    await messaging().hasPermission().then(hasPermission => isPermitted = hasPermission ? true : false)
  
    if (!isPermitted) {
      await messaging().requestPermission().then(data => isPermitted = true)
    }
  
    if (!isPermitted) {
      return
    }
  
    return await messaging().onMessage(remoteMessage => this.showNotification(remoteMessage))
  }

  showNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
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
          this.props.onNotification(data)

          Toast.hide()
        }
      })
    }
  }

  async getToken() {
    return await messaging().getToken()
  }
}

export function InitPushNotification(
  callback: {
    onNotification: (data: any) => void
  }
) {
  if (Platform.OS == `android`) {
    PushNotification.createChannel(
      {
        channelId: `default`,
        channelName: `default`,
        channelDescription: `Default notifications channel`,
        soundName: `default`,
        importance: 4,
        vibrate: true
      },
      created => console.log(`createChannel returned '${created}'`)
    )
  }

  messaging().onNotificationOpenedApp(remoteMessage => {
    // This called only when tapping iOS notification on background,
    // FIXME check again is it working on release mode when notification on notification list

    if(Platform.OS == 'ios' && AppState.currentState == 'background') {
      callback.onNotification(remoteMessage.data)
    }
  })
  
  PushNotification.configure({
    // This called anytime, except when tapping iOS notification on background

    onNotification: notification => callback.onNotification(notification.data)
  })
}

