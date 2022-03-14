import { Component, OnDestroy, OnInit } from '@angular/core';

import { User } from './shared/model/user';
import { store } from './shared/store/store';
import { addUser } from './shared/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
