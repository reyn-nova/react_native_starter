import React, { useEffect } from 'react'
import { Platform } from 'react-native'

import PushNotification from 'react-native-push-notification'
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
        //Do something...
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
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
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