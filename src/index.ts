// @ts-ignore
import { observable, toJS } from 'mobx'
// @ts-ignore
import { AsyncStorage } from 'react-native'

const STORAGE_KEY = '@DNCStorage'

export default class Storage {
  static cache = observable.map({})

  static async read() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)
    if (storage) {
      this.cache.replace(JSON.parse(storage))
    }
    return toJS(this.cache)
  }

  static write(): Promise<void> {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toJS(this.cache)))
  }

  static clear(): Promise<void> {
    this.cache.clear()
    return AsyncStorage.removeItem(STORAGE_KEY)
  }

  static get(key: string) {
    if (!key) {
      throw new Error('Missing key')
    }
    return this.cache.get(key)
  }

  static set(key: string, value: any) {
    if (!key) {
      throw new Error('Missing key')
    }
    this.cache.set(key, value)
    return this.write()
  }

  static setFlag(key: string) {
    return this.set(key, 1)
  }

  static getFlag(key: string) {
    return !!this.get(key)
  }

  static delete(key: string) {
    this.cache.delete(key)
    return this.write()
  }
}
