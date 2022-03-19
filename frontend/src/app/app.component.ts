import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from './shared/model/user';
import { store } from './shared/store/store';
import { addUser } from './shared/store/actions';
import { UserService } from './shared/services/user.service';
import { HomeComponent } from './home/home.component';
import loadSvg from './plugins/loadSvg'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  user: User = User.EMPTY_USER;
  subscription: any = {};
  homeComponent: HomeComponent = new HomeComponent()

  constructor(private userService: UserService) {
    this.subscription = store.subscribe(() => {
      this.user = store.getState().user;
    });
  }

  ngOnInit(): void {
    if (Object.keys(this.user).length) {
      store.dispatch(addUser(User.fromObject(this.userService.getUser())));
    }
    loadSvg()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
