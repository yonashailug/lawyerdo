import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, ACCESS_KEY } from './../../config'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private appStorage: StorageService) { }

  getToken() {
    return this.appStorage.getItem(TOKEN_KEY)
  }

  saveToken(accessToken: string) {
    this.appStorage.setItem(TOKEN_KEY, accessToken)
  }

  removeToken() {
    this.appStorage.removeItem(TOKEN_KEY)
  }

  saveRefreshToken(refreshToken: string) {
    this.appStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }

  removeRefreshToken() {
    this.appStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  getAccessKey() {
    return this.appStorage.getItem(ACCESS_KEY)
  }

  removeAccessKey() {
    this.appStorage.removeItem(ACCESS_KEY)
  }

  saveAccessKey(accessKey: string) {
    this.appStorage.setItem(ACCESS_KEY, accessKey)
  }
}
