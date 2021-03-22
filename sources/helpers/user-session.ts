
import { User } from '../types/user'
import LocalStorageOperation from './local-storage-operation'

export async function saveUserSession(user: User) {
  await LocalStorageOperation.setItem('USER_KEY', user)
}

export async function saveMessagingToken(token: string) {
  await LocalStorageOperation.setItem('MESSAGING_TOKEN_KEY', token)
}

