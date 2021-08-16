
import React, { useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import messaging from '@react-native-firebase/messaging'

import { StackScreenPropsType } from '@models/navigators'

import { executeNotificationData } from '@references/functions/notification-actions'
import { Sentence } from '@references/constants/sentence'

function Home({ navigation, route }: StackScreenPropsType<'Home'>) {
  useEffect(() => {
    messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        executeNotificationData(remoteMessage.data)
      }
    })
  }, [])

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
