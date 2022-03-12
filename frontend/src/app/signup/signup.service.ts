import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

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

  checkEmail(email: string): Observable<{ [key: string]: boolean } | null> {
    return this.httpClient.get(`http://localhost:3000/api/users/verify?email=${email}`)
    .pipe(map(({ data }: any) => data.exists ? data: null ))
  }

}
