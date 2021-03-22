
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import ImagePicker from 'react-native-image-crop-picker'
import { StackNavigatorParameters } from '../types/navigators'

type Props = {
  navigation: StackNavigationProp<StackNavigatorParameters, 'Home'>
}

function Home(props: Props) {
  const { navigation } = props

  const [pickedImage, setPickedImage] = useState('')

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.push(
            'Form',
            {
              fromScreen: 'Home'
            }
          )
        }}
        style={{
          marginHorizontal: 20,
          marginTop: 20
        }}
      >
        <Text
          style={{
            color: 'deepskyblue',
            fontSize: 20,
            textAlign: 'center',
            textDecorationLine: 'underline'
          }}
        >
          Forms Screen
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          showPickerAlert()
        }}
        style={{
          backgroundColor: 'dodgerblue',
          borderRadius: 8,
          paddingHorizontal: 16,
          elevation: 4,
          shadowColor: 'dimgray',
          shadowOffset: {
            height: 2,
            width: 0
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          paddingVertical: 8,
          marginHorizontal: 20,
          marginTop: 20
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '500'
          }}
        >
          Pick image
        </Text>

      </TouchableOpacity>

      <Image
        source={pickedImage == '' ?
          require('../../assets/images/man_portrait.jpg')
          :
          { uri: pickedImage }
        }
        style={{
          borderColor: 'lightgray',
          borderRadius: 100,
          borderWidth: 1,
          height: 90,
          marginTop: 32,
          resizeMode: 'cover',
          width: 90
        }}
      />

      <Text
        style={{
          color: 'gray',
          textAlign: 'center',
          marginHorizontal: 20,
          position: 'absolute',
          bottom: 16,
          left: 20,
          right: 20
        }}
      >
        Build with ❤️ by Crocodic React Native Team
      </Text>

    </SafeAreaView>
  )

  function showPickerAlert() {
    Alert.alert('Ambil Gambar', 'Ambil gambar dengan', [
      {
        text: 'Kamera',
        onPress: (_) => {
          openCamera()
        }
      },
      {
        text: 'Galeri',
        onPress: (_) => {
          openImagePicker()
        }
      }
    ],
      { cancelable: true }
    )
  }

  function openCamera() {
    ImagePicker.openCamera({
      /**
        @property compressImageQuality
        @default -> android: 1 | iOS: 0.8

        Dari 0 hingga 1.
        Di iOS, nilai yang lebih besar dari 0,8 tidak 
        menghasilkan peningkatan kualitas yang nyata di sebagian besar gambar.
        Sementara nilai 0,8 akan mengurangi ukuran file sekitar setengah atau kurang dibandingkan dengan nilai 1.
      */
      compressImageQuality: 0.8,
      cropperCancelText: 'Batal',
      cropperChooseText: 'Terapkan',
      cropping: true,
      height: 500,
      multiple: false,  // default: false
      width: 500
    }).then((image) => {
      uploadNewProfilePhoto(image.path)
    })
  }

  function openImagePicker() {
    ImagePicker.openPicker({
      compressImageQuality: 0.8,
      cropperCancelText: 'Batal',
      cropperChooseText: 'Terapkan',
      cropping: true,
      height: 500,
      width: 500
    }).then(image => {
      uploadNewProfilePhoto(image.path)
    })
  }

  function uploadNewProfilePhoto(newImage: string) {
    setPickedImage(newImage)
  }

}

export default Home
