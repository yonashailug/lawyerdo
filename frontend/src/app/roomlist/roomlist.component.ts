import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { RoomListService } from './roomlist.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styles: [``],
})
export class RoomlistComponent implements OnInit {
  rooms: any[] = [];
  roomDetails: any[] = [];
  hideDiv=false
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private roomlistService: RoomListService
  ) {}

  ngOnInit(): void {
    this.roomlist();
  }

  roomlist() {
    this.roomlistService.roomlist().subscribe((data) => {
      this.rooms = data.data;
    });
  }

  deleteRoom(id: any) {
    this.roomlistService.deleteroom(id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['dashboard']);
      },
      error: (e) => console.error(e),
    });
    console.log(id);
  }

  roomDetail(id:any){
    for (var room of this.rooms) {
      if(room.roomId==id){
        this.roomDetails=room
        this.hideDiv=true
      }
 }
  }
}
