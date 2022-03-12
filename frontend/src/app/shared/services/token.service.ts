import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from './../../config'

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

  getUser(): Object {
    return this.appStorage.getItem(USER_KEY)
  }

  saveUser(user: Object) {
    this.appStorage.setItem(USER_KEY, user)
  }

  removeUser() {
    this.appStorage.removeItem(USER_KEY)
  }
}
