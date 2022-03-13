import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputBinderService } from '../shared/services/input-binder.service';
import { TokenService } from '../shared/services/token.service';
import { SigninService } from './signin.service';

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
    private inputBinder: InputBinderService,
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

    this.signinService
      .signin({ email, password })
      .subscribe((data) => this.getUserFromToken(data));
  }

  setFormData(data: any) {
    this.inputBinder.setInputData(data, this.signinForm);
  }

  getUserFromToken(data: { token: string; user: Object }): void {
    try {
      const token = data.token;
      this.tokenService.saveToken(token);
      this.tokenService.saveUser(data.user);
      if (token) {
        this.router.navigateByUrl('/protected');
      }
    } catch (err) {
      console.log(err);
    }
  }
}
