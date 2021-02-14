import React, { useEffect } from 'react'
import { Platform } from 'react-native'

import PushNotification from 'react-native-push-notification'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './sources/navigators/stack-navigator'

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

PushNotification.configure(
  {
      onNotification: async(notification) => {
        //Do something...
      }
  }
)

function App() {
  useEffect(() => {
    let unsubcribeForegroundListener = undefined as (() => void) | undefined

    async function startListeningMessage() {
      const isPermitted = await getPermissionSuccessState()

      if (!isPermitted) {
        return
      }

      messaging().setBackgroundMessageHandler(async(remoteMessage) => {
        //Do something...
      })

      unsubcribeForegroundListener = await messaging().onMessage(async(remoteMessage) => {
        if (Platform.OS == 'android') {
          PushNotification.localNotification({
            title: remoteMessage.notification?.title,
            message: remoteMessage.notification?.body as string,
            channelId: 'default',
            playSound: true,
            soundName: 'default',
            importance: 'high',
            priority: 'high',
            vibrate: true,
            userInfo: remoteMessage.data,
            group: 'group',
            groupSummary: true
          })
        } else {
          Toast.show({
            text1: remoteMessage.notification?.title,
            text2: remoteMessage.notification?.body as string,
            type: 'info',
            onPress: () => Toast.hide()
          })
        }

        //Do something else...
      })

      getToken()
    }

    startListeningMessage()

    return (() => {
      if (unsubcribeForegroundListener != undefined) {
        unsubcribeForegroundListener()
      }
    })
  }, [])

  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>

      <Toast
        ref = {ref => Toast.setRef(ref)}
      />
    </>
  )

  async function getToken() {
    const token = await messaging().getToken()

    console.log(`Token: ${token}`)
  }

  async function getPermissionSuccessState() {
    let isPermitted = false

    await messaging().hasPermission().then((hasPermission) => isPermitted = hasPermission ? true : false)

    if (!isPermitted) {
        await messaging().requestPermission().then(() => isPermitted = true)
    }

    return isPermitted
  }
}

export default App