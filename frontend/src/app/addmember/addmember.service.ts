import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BASE_URL } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AddmemberService {
  constructor(private httpClient: HttpClient) {}

  checkMember(email: string, room: any[]): boolean {
    let isMember = false;
    for (let i = 0; i < room.length; i++) {
      if (room[i].email === email) {
        isMember = true;
      }
    }
    if (isMember === true) return false;
    return true;
  }

  addMember(data: object, roomId: string) {
    return this.httpClient
      .post(`${BASE_URL}/rooms/${roomId}/join`, data)
      .pipe(
        map(({ data }: any) =>
          data.joined === true ||
          data.acknowledged === true ||
          data.modifiedCount === 1
            ? data
            : null
        )
      );
  }
}
