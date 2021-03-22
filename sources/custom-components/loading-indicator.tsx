
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Color } from '../constants/color'

interface Props {
  color?: string,
  flexNum?: number,
  size?: 'small' | 'large'
}

export default function LoadingIndicator(props: Props) {
  return (
    <ActivityIndicator
      // default to 'small'
      size={props.size != undefined ? props.size : 'small'}
      // default to orange
      color={props.color != undefined ? props.color : Color.orange}
      style={{
        padding: 24,
        flex: props.flexNum
      }}
    />
  )
}
