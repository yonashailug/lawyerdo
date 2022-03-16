import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { store } from '../../shared/store/store';
import { Room } from '../../shared/model/room';
import { EventBus } from '../../shared/services/eventBus';
import { updateRoom } from '../../shared/store/actions';

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
  }

  handleNavigate() {
    this.router.navigateByUrl(`/stream/${this.roomDetails.getRoomId()}/start`);
  }

  addMember() {
    store.dispatch(updateRoom(this.roomDetails))
    this.eventBus.eventBus.emit('addMember')
  }
}
