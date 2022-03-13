import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { User } from '../shared/model/user';
import { BASE_URL } from '../config'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  constructor(private httpClient: HttpClient) { }

  signup(user: User): Observable<any> {

    return this.httpClient
    .post(`${BASE_URL}/users/signup`, user)
  }

  checkEmail(email: string): Observable<{ [key: string]: boolean } | null> {

    return this.httpClient.get(`${BASE_URL}/users/verify?email=${email}`)
    .pipe(map(({ data }: any) => data.exists ? data: null ))
  }

}
