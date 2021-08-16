import React from 'react'
import { AppState, Platform } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'

import { onGetToken, onMessageReceived, onNotificationTap, showGetTokenFailedAlert } from '../references/functions/notification-actions'

export default class MessageListener extends React.Component {
  unsubscribeForegroundMessageListener: (() => void) | undefined

  state = {
    token: undefined as string | undefined
  }

  async componentDidMount() {
    this.getToken()

    this.unsubscribeForegroundMessageListener = await this.startListeningForegroundMessage()
  }

  render() {
    return (
      <Toast
        ref = {ref => Toast.setRef(ref)}
      />
    )
  }

  componentWillUnmount() {
    if (this.unsubscribeForegroundMessageListener != undefined) {
      this.unsubscribeForegroundMessageListener()
    }
  }

  async startListeningForegroundMessage() {
    let isPermitted = false

    await messaging().hasPermission().then(hasPermission => isPermitted = hasPermission ? true : false)

    if (!isPermitted) {
      await messaging().requestPermission().then(() => isPermitted = true)
    }

    if (!isPermitted) {
      return
    }

    return messaging().onMessage(remoteMessage => onMessageReceived(remoteMessage, 'Foreground'))
  }

  getToken() {
    messaging().getToken().then(token => {
      if (token != undefined && token != '') {
        this.setState({token})

        onGetToken(token)
      } else {
        showGetTokenFailedAlert(this.getToken)
      }
    })
    .catch(() => showGetTokenFailedAlert(this.getToken))
  }
}

export function initPushNotification() {
  if (Platform.OS == 'android') {
    PushNotification.createChannel(
      {
        channelId: 'default',
        channelName: 'default',
        channelDescription: 'Default notifications channel',
        soundName: 'default',
        importance: 4,
        vibrate: true
      },
      () => {}
    )
  }

  messaging().setBackgroundMessageHandler(async(remoteMessage) => onMessageReceived(remoteMessage, 'Background'))

  messaging().onNotificationOpenedApp(remoteMessage => {
    // This called only when tapping iOS notification on background

    if (Platform.OS == 'ios' && AppState.currentState == 'background') {
      onNotificationTap(remoteMessage.data)
    }
  })
}

