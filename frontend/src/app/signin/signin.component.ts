import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { store } from '../shared/store/store';
import { addUser } from '../shared/store/actions';

import { TokenService } from '../shared/services/token.service';
import { SigninService } from './signin.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  // providers: [SigninService]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private signinService: SigninService
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signin() {
    const email: string = this.signinForm.get('email')!.value;
    const password: string = this.signinForm.get('password')!.value;

    //TODO: - Validate email: @,.,length,
    //TODO: - Validate password: Accepts only string type

    this.signinService.signin({ email, password }).subscribe((data) => {
      this.getUserFromToken(data);
    });
  }

  setFormData(data: any) {
    this.signinForm.get(data.name)?.patchValue(data.value);
  }

  getUserFromToken(data: { token: string; user: Object }): void {
    try {
      const token = data.token;
      this.tokenService.saveToken(token);
      this.tokenService.saveUser(data.user);

      const user = User.fromObject(data.user);

      store.dispatch(addUser(user));

      if (token) {
        this.router.navigate(['dashboard']);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
