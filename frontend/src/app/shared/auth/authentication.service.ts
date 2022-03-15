import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private tokenService: TokenService,
     private userService: UserService) {}

  public isUserAlreadySignIn() {
    const token: string = this.tokenService.getToken();

    if (token) return true;

    return false;
  }

  public getUser(): User {
    if (this.isUserAlreadySignIn()) {
      return User.fromObject(this.userService.getUser());
    }

    return User.EMPTY_USER;
  }
}
