
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MessageListener from './helpers/messaging-and-notification'
import StackNavigator from './navigators/stack-navigator'
import { StatusBar } from 'react-native'

function App() {
  return (
    <>
      <StatusBar
        /**
          Apabila aplikasi anda bernuansa terang sedangkan
          anda ingin status bar tetap terlihat dengan jelas maka
          gunakan value "dark-content", begitu pula sebaliknya. 
          Coba amati ketika anda mengubah nilainya ke "default"
         */
        barStyle="dark-content"
      />

      <NavigationContainer>

        <StackNavigator />

      </NavigationContainer>

      <MessageListener />
    </>
  )
}

export default App
