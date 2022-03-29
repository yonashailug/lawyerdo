import { Component, OnInit } from '@angular/core';
import { Room } from '../../shared/model/room';
import { User } from '../../shared/model/user';
import { EventBus } from '../../shared/services/eventBus';
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
    private roomlistService: RoomListService,
    private eventBus: EventBus,
  ) {
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
        store.dispatch(removeRoom(id))
      },
      error: (e) => console.error(e),
    });
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
    this.eventBus.eventBus.emit('createRoom')
  }


}
