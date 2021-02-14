import React from 'react'
import { Platform } from 'react-native'

import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'

import MessageListener from './helpers/messaging-and-notification'

import StackNavigator from './navigators/stack-navigator'
import NotificationActions from './helpers/notification-actions'

function App() {
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>

      <MessageListener
        onGetToken = {token => console.log(`Token ${Platform.OS}: ${token}`)}
        onNotification = {notificationData => NotificationActions(notificationData)}
      />

      <Toast
        ref = {ref => Toast.setRef(ref)}
      />
    </>
  )
}

export default App