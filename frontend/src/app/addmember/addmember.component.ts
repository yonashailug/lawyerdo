import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AddmemberService } from './addmember.service';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styles: [],
})
export class AddmemberComponent implements OnInit {
  memberForm: FormGroup;
  @Input() room!: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addmemberService: AddmemberService
  ) {
    this.memberForm = this.formBuilder.group({
      member: ['', Validators.required, this.customValidator.bind(this)],
    });
  }

  customValidator(
    control: FormControl
  ): Observable<{ [key: string]: boolean } | null> {
    const { membersProfile } = this.room;
    const userEmail = control.value;

    let exists = false;
    for (let i = 0; i < membersProfile.length; i++) {
      if (membersProfile[i].email === userEmail) {
        exists = true;
      }
    }
    return exists === true ? of({ data: true }) : of(null);
  }

  handleSubmit() {
    const email = this.memberForm.get('member')?.value;
    const roomId = this.room.roomId;
    this.addmemberService.addMember(email, roomId).subscribe((data) => {
      console.log(data);
    });
  }

  setFormData(data: any) {
    this.memberForm.get(data.name)?.patchValue(data.value);
  }

  checkValid(name: string) {
    if (name === 'member') {
      if (this.memberForm.get('member')?.value === '')
        return `Member email is required`;
      else if (!this.memberForm.get('member')?.valid) {
        return `Member already exists`;
      }
    }
    return ``;
  }

  ngOnInit(): void {}
}
