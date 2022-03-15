import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private httpClient: HttpClient) {}

  signin(user: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/users/login`, user);
  }
}
