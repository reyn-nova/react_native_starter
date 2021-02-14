import { Alert } from 'react-native'

export function OnNotificationTap(notificationData: any) {
  ExecuteNotificationData(notificationData)
}

export function ExecuteNotificationData(notificationData: any) {
  Alert.alert('Data', JSON.stringify(notificationData, null, 2))
}