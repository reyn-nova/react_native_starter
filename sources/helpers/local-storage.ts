import AsyncStorage from '@react-native-async-storage/async-storage'

import { localStorageType } from '../references/types/local-storage'

async function getItem<keyType extends keyof localStorageType>(key: keyType) {
  const itemString = await AsyncStorage.getItem(key)

  let item

  if (itemString != null) {
    item = itemString

    try {
      item = JSON.parse(itemString)
    } catch {
    }
  }

  return item as localStorageType[keyType] | undefined
}

type localStorageValue<T> = {
  [K in keyof T]: T[K] extends keyof localStorageType ? localStorageType[T[K]] : never;
}

async function multiGet<keyType extends readonly (keyof localStorageType)[]>(keys: keyType): Promise<localStorageValue<keyType>> {
  const items = ((await AsyncStorage.multiGet(keys.map(key => key))) as string[][]).map((item) => {
    let value = item[1]

    if (value != undefined) {
      try {
        value = JSON.parse(value)
      } catch {
      }
    }

    return value
  }) as unknown as localStorageValue<keyType>

  return items
}

async function setItem<keyType extends keyof localStorageType, pickedlocalStorageType extends localStorageType[keyType]>(key: keyType, savedData: pickedlocalStorageType) {
  if (savedData == null) {
    return
  }

  const usedSavedData = savedData as any

  await AsyncStorage.setItem(key, typeof usedSavedData != 'string' ? JSON.stringify(usedSavedData) : usedSavedData)
}

async function multiSet(savedDatas: localStorageType) {
  const savedDataArray = Object.keys(savedDatas).map(key => {
    const savedData = savedDatas[key as keyof localStorageType]

    return [key, typeof savedData != 'string' ? JSON.stringify(savedData) : savedData]
  })

  await AsyncStorage.multiSet(savedDataArray)
}

async function removeItem<keyType extends keyof localStorageType>(key: keyType) {
  await AsyncStorage.removeItem(key)
}

async function multiRemove<keyType extends (keyof localStorageType)[]>(keys: keyType) {
  await AsyncStorage.multiRemove(keys)
}

async function clear() {
  await AsyncStorage.clear()
}

export default {
  getItem,
  multiGet,
  setItem,
  multiSet,
  removeItem,
  multiRemove,
  clear
}
