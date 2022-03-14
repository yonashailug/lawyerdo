import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { RoomListService } from './roomlist.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss']
})
export class RoomlistComponent implements OnInit {
  rooms: any[] = [];
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private roomlistService: RoomListService
  ) {

   }

  ngOnInit(): void {
    this.roomlist()

  }

  roomlist() {
    this.roomlistService.roomlist().subscribe((data) => {
     this.rooms=data.data;
     console.log(this.rooms)
    });
  }

}
