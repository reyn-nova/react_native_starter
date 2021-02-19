import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import MessageListener from './helpers/messaging-and-notification'

import StackNavigator from './navigators/stack-navigator'

function App() {
  return (
    <MessageListener>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </MessageListener>
  )
}

export default App