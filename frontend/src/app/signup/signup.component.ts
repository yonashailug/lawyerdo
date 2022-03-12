import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { User } from '../shared/model/user';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
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
      email: ['', Validators.compose([Validators.required,
         Validators.email,
          this.signupService.emailValidator()])],
      password: ['', Validators.required],
      name: ['', Validators.required],
    })
  }

  signup() {

    const email: string = this.signupForm.get('email')!.value;
    const password: string = this.signupForm.get('password')!.value;
    const name: string = this.signupForm.get('name')!.value;

    //TODO: - Validate email: @,.,length,
    //TODO: - Validate password: Accepts only string type

    this.subscriptions[0] = this.signupService.signup(User.fromObject({ email, password, name }))
    .subscribe(data => {
      this.router.navigateByUrl('signin')
    })

  }

  // checkEmail(control: AbstractControl): Observable<ValidationErrors | null> {

  //   // if (!control.value) return of(null)

  //   return this.signupService.checkEmail(control.value).pipe(map(({data}: any) => { invalidAsync: data.exists }))
  // }
  // checkEmail(control: AbstractControl): Observable<ValidationErrors|null> {
  //   console.log(control.value)
  //   return this.signupService.checkEmail(control.value);//.pipe(map(data => data ? null: { invalidAsync: true }))
  //   // return of({ invalidAsync: true }) //this.signupService.checkEmail(control.value).pipe(map(data => data ? null: { invalidAsync: true }))
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }
}
