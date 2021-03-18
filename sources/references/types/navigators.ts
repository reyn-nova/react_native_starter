export type StackNavigatorParametersListType = {
  Home: undefined,
  AnotherScreen: {
    fromScreen: keyof StackNavigatorParametersListType
  }
}
