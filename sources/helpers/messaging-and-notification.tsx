import React from 'react'
import { AppState, Platform } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'

import { OnGetToken, OnForegroundMessageReceived, OnNotificationTap } from '../references/notification-actions'

export default class MessageListener extends React.Component {
  unsubcribeForegroundMessageListener: (() => void) | undefined

  async componentDidMount() {
    this.unsubcribeForegroundMessageListener = await this.startListeningForegroundMessage()

    const token = await this.getToken()
    
    OnGetToken(token)
  }

  render() {
    return (
      <Toast
        ref = {ref => Toast.setRef(ref)}
      />
    )
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
  
    return await messaging().onMessage(remoteMessage => OnForegroundMessageReceived(remoteMessage))
  }

  async getToken() {
    return await messaging().getToken()
  }
}

export function InitPushNotification() {
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
    // This called only when tapping iOS notification on background

    if(Platform.OS == 'ios' && AppState.currentState == 'background') {
      OnNotificationTap(remoteMessage.data)
    }
  })
  
  PushNotification.configure({
    // This called anytime, except when tapping iOS notification on background

    onNotification: notification => OnNotificationTap(notification.data)
  })
}

