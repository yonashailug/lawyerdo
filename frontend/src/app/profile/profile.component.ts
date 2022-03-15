import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/model/user';
import { TokenService } from '../shared/services/token.service';
import { logoutUser } from '../shared/store/actions';
import { store } from '../shared/store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit, OnDestroy {
  //user2: any;
  @Input() user: User = User.EMPTY_USER;
  subscription: any = {};
  // sub: Subscription | undefined;
  isOpen: boolean = false

  constructor(private tokenService: TokenService, private router: Router) {
    this.user = store.getState().user;
    this.subscription = store.subscribe(() => {
      this.user = store.getState().user;
    });
  }

  logout() {
    store.dispatch(logoutUser());
    this.router.navigate(['signin']);
  }

  ngOnInit(): void {
    // this.user = this.tokenService.getUser();
    // console.log(this.user.getName());
  }

  ngOnDestroy() {
    this.subscription();
  }

  goto() {
    this.router.navigateByUrl('profile') // TODO: - profile page if exists
  }
}
