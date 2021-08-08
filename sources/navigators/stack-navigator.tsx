
import React from 'react'

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { NavigatorParameters } from '@models/navigators'

import Home from '@screens/home'
import PickImage from '@screens/pick-image'

const Stack = createStackNavigator<NavigatorParameters>()

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions = {{
        headerShown: true, // false to remove header
        gestureEnabled: true // default true for ios, false for android
      }}
    >
      <Stack.Screen
        name = "Home"
        component = {Home}
        options = {{
          headerTitle: 'React Native Starter'
        }}
      />

      <Stack.Screen
        name = "PickImage"
        component = {PickImage}
        options = {{
          ...TransitionPresets.SlideFromRightIOS,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'dodgerblue'
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          title: 'Pick Image'
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigator
