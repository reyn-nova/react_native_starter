
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import MessageListener from '@helpers/messaging-and-notification'

import StackNavigator from '@navigators/stack-navigator'

function App() {
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>

      <MessageListener />
    </>
  )
}

export default App
