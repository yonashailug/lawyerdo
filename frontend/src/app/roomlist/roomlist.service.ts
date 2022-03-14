import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../config'

@Injectable({
  providedIn: 'root'
})
export class RoomListService {

  constructor(private httpClient: HttpClient) { }

  roomlist(): Observable<any> {

    return this.httpClient
    .get(`${BASE_URL}/rooms`)
  }
}
