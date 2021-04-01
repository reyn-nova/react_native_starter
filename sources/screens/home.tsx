
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'

import { Sentence } from '../references/constants/sentence'
import { StackNavigatorParameters } from '../references/types/navigators'

type PropsType = {
  navigation: StackNavigationProp<StackNavigatorParameters, 'Home'>
}

function Home(props: PropsType) {
  const { navigation } = props

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress = {() => navigation.navigate('PickImage')}
          style={{
            backgroundColor: 'dodgerblue',
            borderRadius: 8,
            elevation: 4,
            marginHorizontal: 20,
            marginTop: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            shadowColor: 'dimgray',
            shadowOffset: {
              height: 2,
              width: 0
            },
            shadowOpacity: 0.3,
            shadowRadius: 4
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '500'
            }}
          >
            Go To Pick Image Screen
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style = {{
          color: 'gray',
          margin: 20,
          textAlign: 'center'
        }}
      >
        {Sentence.starterWatermark}
      </Text>
    </SafeAreaView>
  )
}

export default Home
