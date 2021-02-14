import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import { StackNavigatorParametersListType } from '../references/types/navigators'

import Home from '../screens/home'
import AnotherScreen from '../screens/another-screen'

const Stack = createStackNavigator<StackNavigatorParametersListType>()

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerShown: false
      }}
    >
      <Stack.Screen
        name = 'Home'
        component = {Home}
      />

      <Stack.Screen
        name = 'AnotherScreen'
        component = {AnotherScreen}
        options = {{
          ...TransitionPresets.RevealFromBottomAndroid
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator