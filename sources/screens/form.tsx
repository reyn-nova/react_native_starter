
import React, { useRef, useState } from 'react'
import { Keyboard, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { StackNavigatorParameters } from '../types/navigators'
import { Font } from '../constants/font'
import { Color } from '../constants/color'
import LoadingIndicator from '../custom-components/loading-indicator'
import { showSnackbar } from '../custom-components/snackbar'

type PropsType = {
  navigation: StackNavigationProp<StackNavigatorParameters, 'Form'>
  route: RouteProp<StackNavigatorParameters, 'Form'>
}

function Form(props: PropsType) {
  const { navigation, route } = props

  const refPasswordInput = useRef<TextInput>(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isFocusToUsername, setIsFocusToUsername] = useState(false)
  const [isFocusToPassword, setIsFocusToPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          flexGrow: 1
        }}
        style={{
          flex: 1,
          padding: 20
        }}
      >
        <Text
          style={{
            color: Color.superDarkGray,
            fontSize: 23,
            fontWeight: '600',
            textAlign: 'right'
            // fontFamily: Font.interSemiBold
          }}
        >Login Forms
        </Text>

        <Text
          style={{
            color: isFocusToUsername ? Color.orange : Color.superDarkGray,
            fontSize: 16,
            marginTop: 44
            // fontFamily: Font.interSemiBold
          }}
        >Username
        </Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: isFocusToUsername ? Color.orange : 'lightgray',
            height: 45,
            paddingHorizontal: 16,
            paddingVertical: 4,
            // fontFamily: Font.interRegular,
            borderRadius: 8,
            marginTop: 8,
            fontSize: 17
          }}
          numberOfLines={1}
          onBlur={(_) => {
            setIsFocusToUsername(false)
          }}
          onFocus={() => {
            setIsFocusToUsername(true)
            setIsFocusToPassword(false)
          }}
          onChangeText={(text) => {
            setUsername(text)
          }}
          onSubmitEditing={(_) => {
            console.log('onSubmitEditing username')
            refPasswordInput.current?.focus()
          }}
          maxLength={8}
          placeholder="Ketik di sini"
          returnKeyType="next"
          value={username}
        />

        <Text
          style={{
            color: isFocusToPassword ? Color.orange : Color.superDarkGray,
            fontSize: 16,
            marginTop: 16
            // fontFamily: Font.interSemiBold
          }}
        >Password
        </Text>

        <TextInput
          ref={refPasswordInput}
          style={{
            borderWidth: 1,
            borderColor: isFocusToPassword ? Color.orange : 'lightgray',
            height: 45,
            paddingHorizontal: 16,
            paddingVertical: 4,
            // fontFamily: Font.interRegular,
            borderRadius: 8,
            marginTop: 8,
            fontSize: 17
          }}
          numberOfLines={1}
          onBlur={(_) => {
            setIsFocusToPassword(false)
          }}
          onFocus={() => {
            setIsFocusToUsername(false)
            setIsFocusToPassword(true)
          }}
          onChangeText={(text) => {
            setPassword(text)
          }}
          onSubmitEditing={(_) => {
            console.log('onSubmitEditing')
          }}
          keyboardType="numeric"
          placeholder="Ketik di sini"
          returnKeyType="done"
          value={password}
        />

        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 16
          }}
        >
          <Text
            onPress={(_) => {
              showSnackbar('Keep calm and stay cool ;)', 'ABSOLUTELY')
            }}
            style={{
              color: 'dodgerblue',
              fontSize: 16
            }}
          >Lupa kata sandi?
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!isValidForm() || isLoading}
          onPress={() => {
            fetchLogin()
          }}
          style={{
            height: 50,
            elevation: !isValidForm() || isLoading ? 0 : 4,
            shadowOffset: {
              height: 2,
              width: 0
            },
            shadowRadius: 4,
            shadowColor: 'dodgerblue',
            shadowOpacity: !isValidForm() || isLoading ? 0 : 0.5,
            marginTop: 44,
            marginBottom: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: !isValidForm() || isLoading ? 'gray' : 'dodgerblue'
          }}
        >
          {
            isLoading ?
              <LoadingIndicator
                flexNum={1}
              />
              :
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '700'
                }}
              >Masuk
              </Text>
          }

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  )

  function isValidForm() {
    return username.trim() != '' && username.length == 8 && password.trim() != '' && password.trim().length >= 8
  }

  function fetchLogin() {
    setIsLoading(true)
    Keyboard.dismiss()

    setTimeout(() => {
      setIsLoading(false)
      showSnackbar('Login complete')
    }, 2000)
  }

}

export default Form
