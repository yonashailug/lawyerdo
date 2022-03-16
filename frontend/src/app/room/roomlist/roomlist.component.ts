import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../../shared/model/room';
import { User } from '../../shared/model/user';
import { TokenService } from '../../shared/services/token.service';
import { addRooms, removeRoom } from '../../shared/store/actions';
import { store } from '../../shared/store/store';
import { RoomListService } from './roomlist.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styles: [``],
})
export class RoomlistComponent implements OnInit {
  rooms: Room[] = [];
  roomDetails: Room = Room.EMPTY_ROOM;
  hideDiv = false;
  constructor(
    private router: Router,
    private roomlistService: RoomListService
  ) {
    // this.rooms = store.getState().rooms
    store.subscribe(() => {
      this.rooms = store.getState().rooms
    })
  }

  ngOnInit(): void {
    this.roomlist();
  }

  roomlist() {
    this.roomlistService.roomlist()
    .subscribe((data) => {
      store.dispatch(addRooms(data.data.map((room: any) => {
        room.owner = User.fromObject(room.owner)
        room.membersProfile = room.membersProfile
        .map((member: any) => User.fromObject(member))
        return Room.fromObject(room)
      })))
    });
  }

  deleteRoom(id: any) {
    this.roomlistService.deleteroom(id).subscribe({
      next: (res) => {
        // console.log(res);
        // this.router.navigate(['dashboard']);
        store.dispatch(removeRoom(id))
      },
      error: (e) => console.error(e),
    });
    console.log(id);
  }

  roomDetail(id: any) {
    for (var room of this.rooms) {
      if (room.getRoomId() == id) {
        this.roomDetails = room;
        this.hideDiv = true;
      }
    }
  }

  goto() {
    this.router.navigateByUrl('room/create');
  }
}
