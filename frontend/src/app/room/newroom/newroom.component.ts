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
import { RoomService } from '../../shared/services/room.service';
import { TokenService } from '../../shared/services/token.service';
import { UserService } from '../../shared/services/user.service';
import { SigninService } from '../../signin/signin.service';

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
    private roomService: RoomService,
    private userService: UserService,
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
    if (!this.newRoomForm.valid) return
    this.roomService.createRoom({ name }).subscribe((data) => {
      this.router.navigate(['dashboard']);
    });
  }

  setFormData(data: any) {
    this.newRoomForm.get(data.name)?.patchValue(data.value);
  }
}
