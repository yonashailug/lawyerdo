import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/model/room';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styles: [],
})
export class RoomdetailComponent implements OnInit {
  hideDiv = true;
  @Input() roomDetails: Room = Room.EMPTY_ROOM;
  room: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(this.roomDetails);
  }

  handleNavigate() {
    this.router.navigateByUrl(`/stream/${this.roomDetails.getRoomId()}/start`);
  }

  addMember() {
    this.room = this.roomDetails;
    this.hideDiv = false;
  }
}
