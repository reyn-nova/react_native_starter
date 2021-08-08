import AsyncStorage from '@react-native-async-storage/async-storage'

import { LocalStorage } from '@models/local-storage'

type LocalStorageValue<T> = {
  [K in keyof T]: T[K] extends keyof LocalStorage ? LocalStorage[T[K]] : never;
}

async function getItem<key extends keyof LocalStorage>(key: key) {
  const itemString = await AsyncStorage.getItem(key)

  let item

  if (itemString != null) {
    try {
      item = JSON.parse(itemString)
    } catch (error) {
      item = itemString
    }
  }

  return item as LocalStorage[key] | undefined
}

async function getItems<keys extends readonly (keyof LocalStorage)[]>(keys: keys): Promise<LocalStorageValue<keys>> {
  const items = ((await AsyncStorage.multiGet(keys.map(key => key))) as string[][]).map((item) => {

    let value

    if (item[1] != undefined) {
      try {
        value = JSON.parse(item[1])
      } catch { }
    }

    return value
  }) as unknown as LocalStorageValue<keys>

  return items
}

async function setItem<key extends keyof LocalStorage, pickedLocalStorage extends LocalStorage[key]>(
  key: key,
  data: pickedLocalStorage
) {
  if (data == null) {
    return
  }

  const usedSavedData = data as any

  await AsyncStorage.setItem(key, typeof usedSavedData != 'string' ? JSON.stringify(usedSavedData) : usedSavedData)
}

async function setItems(data: LocalStorage) {
  const savedDataArray = Object.keys(data).map(key => {
    const savedData = data[key as keyof LocalStorage]

    return [key, typeof savedData != 'string' ? JSON.stringify(savedData) : savedData]
  })

  await AsyncStorage.multiSet(savedDataArray)
}

async function removeItem<key extends keyof LocalStorage>(key: key) {
  await AsyncStorage.removeItem(key)
}

async function removeItems<keys extends (keyof LocalStorage)[]>(keys: keys) {
  await AsyncStorage.multiRemove(keys)
}

async function clear() {
  await AsyncStorage.clear()  // TODO: Must this function exist?
}

export default {
  getItem,
  getItems,
  setItem,
  setItems,
  removeItem,
  removeItems,
  clear
}
