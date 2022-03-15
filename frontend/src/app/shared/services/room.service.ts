import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}

  createRoom(data: object): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/rooms`, data);
  }
}
