import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type NavigatorParameters = {
  Home: undefined
  PickImage: undefined
}

export type StackScreenPropsType<K extends keyof NavigatorParameters> = {
  route: RouteProp<NavigatorParameters, K>,
  navigation: StackNavigationProp<NavigatorParameters, K>
}
