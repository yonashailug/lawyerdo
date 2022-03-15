import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styles: [],
})
export class RoomdetailComponent implements OnInit {
  hideDiv = true;
  @Input() roomDetails!: any;
  room: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    // console.log(this.roomDetails);
  }

  handleNavigate() {
    this.router.navigateByUrl(`/stream/${this.roomDetails.roomId}/start`);
  }

  addMember() {
    this.room = this.roomDetails;
    this.hideDiv = false;
  }
}
