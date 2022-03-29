import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user';
import { TokenService } from '../shared/services/token.service';
import { UserService } from '../shared/services/user.service';
import { logoutUser } from '../shared/store/actions';
import { store } from '../shared/store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() user: User = User.EMPTY_USER;
  subscription: any = {};
  isOpen: boolean = false;

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = store.getState().user;
    this.subscription = store.subscribe(() => {
      this.user = store.getState().user;
    });
  }

  logout() {
    store.dispatch(logoutUser());
    this.tokenService.removeToken();
    this.userService.removeUser();
    this.tokenService.removeAccessKey();
    this.router.navigate(['signin']);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription();
  }

  goto() {
    this.router.navigateByUrl('profile'); // TODO: - profile page if exists
  }

  isLoggedIn() {
    let len = 0;
    for (let key in this.user) {
      if (['', null, undefined].includes((this.user as any)[key])) {
        len++;
      }
    }
    return Object.keys(this.user).length !== len;
  }
}
