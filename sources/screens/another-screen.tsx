import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import { StackNavigatorParametersListType } from '../references/types/navigators'

type PropsType = {
  navigation: StackNavigationProp<StackNavigatorParametersListType, 'AnotherScreen'>,
  route: RouteProp<StackNavigatorParametersListType, 'AnotherScreen'>
}

function AnotherScreen(props: PropsType) {
  const { navigation, route } = props

  return (
    <SafeAreaView
      style = {{
        alignItems: 'center',
        backgroundColor: 'rgba(20, 20, 20, 1.0)',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <Text
        style = {{
          color: 'white',
          fontWeight: '600',
          fontSize: 28,
          marginHorizontal: 20,
          textAlign: 'center'
        }}
      >
        Another Screen
      </Text>

      <TouchableOpacity
        activeOpacity = {0.6}
        onPress = {() => navigation.navigate(route.params.fromScreen)}
        style = {{
          marginHorizontal: 20,
          marginTop: 20
        }}
      >
        <Text
          style = {{
            color: 'skyblue',
            fontSize: 20,
            textAlign: 'center',
            textDecorationLine: 'underline'
          }}
        >
          Go back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AnotherScreen
