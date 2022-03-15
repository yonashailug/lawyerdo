import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styles: [],
})
export class RoomdetailComponent implements OnInit {
  constructor(private router: Router) {
    console.log(this.roomDetails)
  }

  ngOnInit(): void {}

  @Input() roomDetails!: any;

  handleNavigate() {
    this.router.navigateByUrl(`/stream/${this.roomDetails.roomId}/start`)
  }
}
