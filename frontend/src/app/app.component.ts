import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from './shared/model/user';
<<<<<<< HEAD
import { store } from './shared/store/store';
import { addUser } from './shared/store/actions';
import { Subscription } from 'rxjs';
=======
import { store } from './shared/store/store'
import { addUser } from './shared/store/actions'
import { StorageService } from './shared/services/storage.service';
import { USER_KEY } from './config';
import { UserService } from './shared/services/user.service';
>>>>>>> 1891ad82132ad231249b8442a09098bf2e102b6b

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
<<<<<<< HEAD
  users: any = [];
  subscription: any = {};

  constructor() {
    this.subscription = store.subscribe(() => {
      this.users = store.getState().data;
    });
  }

  ngOnInit(): void {
    this.users = store.getState().data;

    this.addUser(
      User.fromObject({ _id: 1, name: 'Jonas', email: 'yonashailug@gmail.com' })
    );
  }

  addUser(user: User) {
    store.dispatch(addUser(user));
=======
  user: User = User.EMPTY_USER
  subscription: any = []

  constructor(private userService: UserService) {
    this.subscription = store.subscribe(() => { this.user = store.getState().user })
  }

  ngOnInit(): void {
    if (Object.keys(this.user).length) {
      store.dispatch(addUser(User.fromObject(this.userService.getUser())))
    }
>>>>>>> 1891ad82132ad231249b8442a09098bf2e102b6b
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
