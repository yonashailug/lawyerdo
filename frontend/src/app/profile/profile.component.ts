import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { TokenService } from '../shared/services/token.service';
import { store } from '../shared/store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit, OnDestroy {
  //user2: any;
  @Input() user: User = User.EMPTY_USER
  subscription: any = {};

  constructor(private tokenService: TokenService) {
    this.subscription = store.subscribe(() => {
      this.user = store.getState().user
    })
  }

  ngOnInit(): void {
    // this.user = this.tokenService.getUser();
    console.log(this.user.getName())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
