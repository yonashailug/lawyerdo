import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../config'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  get(path: string): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/${path}`)
  }

  post(path: string, data: any): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/${path}`, data)
  }
}
