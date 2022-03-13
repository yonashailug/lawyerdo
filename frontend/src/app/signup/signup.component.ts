import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User } from '../shared/model/user';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements OnDestroy, OnInit {

  signupForm: FormGroup = new FormGroup({})

  subscriptions: Subscription[] = []
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
         Validators.email]),
         this.emailValidator.bind(this)],
      password: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  handleSubmit() {

    const email: string = this.signupForm.get('email')!.value
    const password: string = this.signupForm.get('password')!.value
    const name: string = this.signupForm.get('name')!.value

    this.subscriptions[0] = this.signupService.signup(User.fromObject({ email, password, name }))
    .subscribe(data => {
      this.router.navigateByUrl('signin')
    })

  }

  get email() {
    return this.signupForm.get('email')!
  }

  emailValidator(control: FormControl): 
  Promise<{ [key: string]: boolean } | null> | Observable<{ [key: string]: boolean } | null> {

    return this.signupService.checkEmail(control.value)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }
}
