import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'

import { StackNavigatorParametersListType } from '../references/types/navigators'

type PropsType = {
  navigation: StackNavigationProp<StackNavigatorParametersListType, 'Home'>
}

function Home(props: PropsType) {
  const { navigation } = props

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
        {'Welcome to\nReact Native Starter'}
      </Text>

      <TouchableOpacity
        activeOpacity = {0.6}
        onPress = {() => {
          navigation.push(
            'AnotherScreen',
            {
              fromScreen: 'Home'
            }
          )
        }}
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
          Go to Another Screen
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home