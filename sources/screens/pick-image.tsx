
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'

import { StackScreenPropsType } from '@models/navigators'

function PickImage({ navigation, route }: StackScreenPropsType<'PickImage'>) {
  const [ pickedImage, setPickedImage ] = useState('')

  const imageSize = 175

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <TouchableOpacity
        activeOpacity = {0.8}
        onPress = {showImagePickerAlert}
        style = {{
          alignItems: 'center',
          borderColor: 'gray',
          borderRadius: imageSize / 2,
          borderStyle: pickedImage ? 'solid' : 'dashed',
          borderWidth: 3,
          height: imageSize,
          justifyContent: 'center',
          marginTop: 32,
          overflow: 'hidden',
          width: imageSize
        }}
      >
        {
          pickedImage ?
            <Image
              source = {{uri: pickedImage}}
              style = {{
                height: imageSize,
                width: imageSize
              }}
            />
            :
            <View
              style = {{
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <Text
                style = {{
                  color: 'gray',
                  fontSize: 20
                }}
              >
                No Image
              </Text>
            </View>
        }
      </TouchableOpacity>

      <TouchableOpacity
          activeOpacity={0.8}
          onPress = {showImagePickerAlert}
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
            Pick Image
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )

  function showImagePickerAlert() {
    Alert.alert(
      'Ambil Gambar',
      'Ambil gambar dengan',
      [
        {
          text: 'Kamera',
          onPress: openCamera
        },
        {
          text: 'Galeri',
          onPress: openImagePicker
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
      height: 500,
      multiple: false,  // default: false
      width: 500
    }).then(image => setPickedImage(image.path))
  }

  function openImagePicker() {
    ImagePicker.openPicker({
      compressImageQuality: 0.8,
      cropperCancelText: 'Batal',
      cropperChooseText: 'Terapkan',
      height: 500,
      width: 500
    }).then(image => setPickedImage(image.path))
  }
}

export default PickImage
