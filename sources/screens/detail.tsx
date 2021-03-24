
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, useWindowDimensions } from 'react-native'
import { StackNavigatorParameters } from '../types/navigators'

type Props = {
  navigation: StackNavigationProp<StackNavigatorParameters, 'Detail'>
  route: RouteProp<StackNavigatorParameters, 'Detail'>
}

function Detail(props: Props) {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props.navigation.goBack()
        }}
        style={{
          height: 50,
          elevation: 4,
          shadowOffset: {
            height: 2,
            width: 0
          },
          shadowRadius: 4,
          shadowColor: 'dodgerblue',
          shadowOpacity: 0.3,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'dodgerblue',
          width: useWindowDimensions().width / 2
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '700'
          }}
        >Go Back
        </Text>

      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Detail
