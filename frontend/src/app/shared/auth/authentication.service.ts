import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private tokenService: TokenService) { }

  public isUserAlreadySignIn() {

    const token: string = this.tokenService.getToken()
    
    if (token) return true

    return false

  }

  public getUser(): User {

    if (this.isUserAlreadySignIn()) {
      return User.fromObject(this.tokenService.getUser())
    }

    return User.EMPTY_USER
  }
}
