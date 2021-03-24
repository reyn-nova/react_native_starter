
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { StackNavigatorParameters } from '../types/navigators'
import Home from '../screens/home'
import Detail from '../screens/detail'

const Stack = createStackNavigator<StackNavigatorParameters>()

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true, // false to remove header
        gestureEnabled: true // default true for ios, false for android
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Welcome to React Native Starter'
        }}
      />

      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: 'skyblue'
          }
        }}
      />

    </Stack.Navigator>
  )
}

export default StackNavigator
