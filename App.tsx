import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './sources/navigators/stack-navigator'

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}

export default App