import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/courses')
  }
}
