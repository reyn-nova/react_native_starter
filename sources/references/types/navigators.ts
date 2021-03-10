type ScreensList = (
  'Home'
  | 'AnotherScreen'
)

export type StackNavigatorParametersListType = {
  Home: undefined,
  AnotherScreen: {
    fromScreen: ScreensList
  }
}
