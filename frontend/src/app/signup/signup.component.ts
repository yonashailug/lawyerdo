import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User } from '../shared/model/user';
import { TokenService } from '../shared/services/token.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService],
})
export class SignupComponent implements OnDestroy, OnInit {
  signupForm: FormGroup = new FormGroup({});

  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
        this.emailValidator.bind(this),
      ],
      password: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  handleSubmit() {
    const email: string = this.signupForm.get('email')!.value;
    const password: string = this.signupForm.get('password')!.value;
    const name: string = this.signupForm.get('name')!.value;

    this.subscriptions[0] = this.signupService
      .signup(User.fromObject({ email, password, name }))
      .subscribe((data) => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data.user);
        console.log(this.tokenService.getUser(), this.tokenService.getToken());
        this.router.navigate(['home']);
      });
  }

  // get email() {
  //   return this.signupForm.get('email')!;
  // }

  emailValidator(
    control: FormControl
  ):
    | Promise<{ [key: string]: boolean } | null>
    | Observable<{ [key: string]: boolean } | null> {
    return this.signupService.checkEmail(control.value);
  }

  setFormData(data: any) {
    this.signupForm.get(data.name)?.patchValue(data.value);
  }

  checkValid(name: string) {
    if (name === 'email') {
      if (this.signupForm.get('email')?.value === '')
        return `Email is required`;
      else if (!this.signupForm.get('email')?.valid) {
        return `Email already exists`;
      }
    }
    if (name === 'name') {
      if (this.signupForm.get('name')?.value === '') return `Name is required`;
      else if (!this.signupForm.get('name')?.valid) {
        return `Invalid Username`;
      }
    }
    if (name === 'password') {
      if (this.signupForm.get('password')?.value === '')
        return `Password is required`;
      else if (!this.signupForm.get('password')?.valid) {
        return `Invalid Password`;
      }
    }
    return ``;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
