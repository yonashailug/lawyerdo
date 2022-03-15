import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roomdetail',
  templateUrl: './roomdetail.component.html',
  styles: [],
})
export class RoomdetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() roomDetails!: any;
}
