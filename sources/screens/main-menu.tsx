
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { StackNavigatorParameters } from '../types/navigators'

type Props = {
  navigation: StackNavigationProp<StackNavigatorParameters, 'MainMenu'>
  route: RouteProp<StackNavigatorParameters, 'MainMenu'>
}

// const BottomTab = createBottomTabNavigator()

function MainMenu(props: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >

    </SafeAreaView>
  )
}

export default MainMenu
