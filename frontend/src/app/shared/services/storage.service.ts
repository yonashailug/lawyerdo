import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: Storage
  constructor() {
    this.storage = window.localStorage // Default storage

    if (!this.isSupported()) {
      throw new Error('Storage is not supported by browser!')
    }
  }

  setItem(key: string, value: Object | string): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string): any {
    return JSON.parse(this.storage.getItem(key)!)
  }

  removeItem(key: string): void {
    this.storage.removeItem(key)
  }

  clear(): void {
    this.storage.clear()
  }

  isSupported() {
    let supported = true

    if (!this.storage) {
      supported = false
    }

    return supported
  }
}
