// @ts-ignore
import { observable } from 'mobx'
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
    return this.cache.toJS()
  }

  static write() {
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.cache.toJS()))
  }

  static clear() {
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

  static appendToArray(key: string, value: any) {
    if (!key) {
      throw new Error('Missing key')
    }

    if (this.get(key) === undefined) {
      throw new Error('Undefined item')
    }

    const storedItem = this.get(key).toJS()
    if (!Array.isArray(storedItem)) {
      throw new Error('Stored item is not an array')
    }

    this.set(key, storedItem.concat(value))
  }

  static removeFromArray(key: string, value: any) {
    if (!key) {
      throw new Error('Missing key')
    }

    if (this.get(key) === undefined) {
      throw new Error('Undefined item')
    }

    const storedItem = this.get(key).toJS()
    if (!Array.isArray(storedItem)) {
      throw new Error('Stored item is not an array')
    }

    this.set(key, storedItem.filter(item => item !== value))
  }

  static setFlag(key: string) {
    return this.set(key, 1)
  }

  static getFlag(key: string) {
    return !!this.get(key)
  }

  static delete(key: string) {
    this.cache.delete(key)
  }
}
