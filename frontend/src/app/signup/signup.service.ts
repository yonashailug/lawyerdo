import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, } from 'rxjs';
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { User } from '../shared/model/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  constructor(private httpClient: HttpClient) { }

  signup(user: User): Observable<any> {

    return this.httpClient
    .post('http://localhost:3000/api/users/signup', user)
  }

  checkEmail(email: string): Observable<any> {
    console.log(email)
    return of({ data: { exists: true }})
    // return this.httpClient.get(`http://localhost:3000/api/users/verify?email=${email}`)
  }

  emailValidator(email: string = ''): AsyncValidatorFn {
    return (control: AbstractControl):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {

        
      if (control.value === null || control.value.length === 0) {
        return of(null)

      } else if (control.value === email) {
        return of(null)

      } else {
        // console.log(control.valueChanges)
        return this.checkEmail(control.value)
        .pipe(
          map(data =>{
            console.log(data)
            return null;
          }
            // exists ? { email: { value: control.value } } : null
          )
        )
        // return control.valueChanges.pipe(
        //   // debounceTime(500),
        //   // take(1),
        //   switchMap(_ =>{
        //     console.log(control.value)
        //     return this.checkEmail(control.value)
        //     .pipe(
        //       map(({ data }: any) =>
        //         data.exists ? { email: { value: control.value } } : null
        //       )
        //     )
        //   }
            
        //   )
        // );
      }
    };
  }
}
