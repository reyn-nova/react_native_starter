import React from 'react'
import { AppState, Platform } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'

import { OnGetToken, OnMessageReceived, OnNotificationTap, ShowGetTokenFailedAlert } from '../references/notification-actions'

export default class MessageListener extends React.Component {
  unsubcribeForegroundMessageListener: (() => void) | undefined

  state = {
    token: undefined as string | undefined
  }

  async componentDidMount() {
    this.getToken()

    this.unsubcribeForegroundMessageListener = await this.startListeningForegroundMessage()
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
  
    return await messaging().onMessage(remoteMessage => OnMessageReceived(remoteMessage, 'Foreground'))
  }

  getToken() {
    messaging().getToken().then(token => {
      if (token != undefined && token != '') {
        this.setState({token})
  
        OnGetToken(token)
      } else {
        ShowGetTokenFailedAlert(this.getToken)
      }
    })
    .catch (err => ShowGetTokenFailedAlert(this.getToken))
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

  messaging().setBackgroundMessageHandler(async(remoteMessage) => OnMessageReceived(remoteMessage, 'Background'))

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

