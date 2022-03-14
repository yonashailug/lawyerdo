import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomService } from '../shared/services/room.service';
import { TokenService } from '../shared/services/token.service';
import { SigninService } from '../signin/signin.service';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styles: [],
})
export class NewroomComponent implements OnInit {
  newRoomForm: FormGroup;
  // memberArray: FormArray;
  private subscription: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private roomService: RoomService
  ) {
    this.newRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
      // members: formBuilder.array([['', null, this.asyncValidator.bind(this)]]),
    });

    // this.memberArray = this.newRoomForm.get('members') as FormArray;
  }
  ngOnInit(): void {}

  handleSubmit() {
    const name: string = this.newRoomForm.get('name')!.value;

    alert('Creating the room: ' + name);
    this.roomService.createRoom({ name }).subscribe((data) => {
      this.router.navigate(['dashboard']);
    });
  }

  getUserFromToken(data: { token: string; user: Object }): void {
    try {
      const token = data.token;
      this.tokenService.saveToken(token);
      this.tokenService.saveUser(data.user);
      if (token) {
        this.router.navigate(['dashboard']);
      }
    } catch (err) {
      console.log(err);
    }
  }

  setFormData(data: any) {
    this.newRoomForm.get(data.name)?.patchValue(data.value);
  }
}
