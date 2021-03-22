
import Snackbar from 'react-native-snackbar'
import { Color } from '../constants/color'

export function showSnackbar(
  message: string,
  actionText: string = 'OK',
  duration: number = Snackbar.LENGTH_LONG,
) {
  Snackbar.show({
    text: message,
    duration,
    numberOfLines: 5,
    action: {
      text: actionText,
      onPress: () => {
        Snackbar.dismiss()
      },
      textColor: Color.orange
    }
  })
}
