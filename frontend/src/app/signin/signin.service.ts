import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private httpClient: HttpClient) { }

  signin(user: { email: string, password: string }): Observable<any> {

    return this.httpClient
    .post('http://localhost:3000/api/users/login', user)
  }
}
