import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/model/room';
import { EventBus } from 'src/app/shared/services/eventBus';
import { updateRoom } from 'src/app/shared/store/actions';
import { store } from 'src/app/shared/store/store';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styles: [],
})
export class RoomdetailComponent implements OnInit {
  hideDiv = true;
  @Input() roomDetails: Room = Room.EMPTY_ROOM;
  room: any;
  constructor(private router: Router, private eventBus: EventBus) {}

  ngOnInit(): void {
    // console.log(this.roomDetails);
  }

  handleNavigate() {
    this.router.navigateByUrl(`/stream/${this.roomDetails.getRoomId()}/start`);
  }

  // addMember() {
  //   this.room = this.roomDetails;
  //   this.hideDiv = false;
  // }

  addMember() {
    console.log(this.roomDetails)
    store.dispatch(updateRoom(this.roomDetails))
    this.eventBus.eventBus.emit('addMember')
  }
}
