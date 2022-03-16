import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AComponent } from '../components/a.component';
import { Room } from '../model/room';
import { MemberService } from '../services/member.service';
import { store } from '../store/store';

@Component({
  selector: 'app-modals',
  template: `
  <div class="w-full flex justify-center items-center h-full">
    <div style="width: 30rem" class="modal-dialog p-0 rounded" role="document">
      <div class="modal-content">
        <div class="modal-header rounded-t p-4" [ngStyle]="{ background: 'purple' }">
          <div class="m-auto">
            <p class="uppercase text-white text-base w-full p-2 text-center">
            Add member
            </p>
          </div>
        </div>

        <div class="modal-body p-4">
          <div class="formField">
            <label class="formFieldLabel" htmlFor="member">Member email</label>
            <div class="relative">
              <app-input
                (inputOnBlurEvent)="setFormData($event)"
                [name]="'member'"
              ></app-input>
            </div>
            <small name="errorText">{{ checkValid("member") }}</small>
          </div>
        </div>

        <div class="modal-footer p-4 border-t border-gray-500">
          <div class="text-center flex justify-end">
            <app-button (onBtnClick)="handlClose()" [variant]="'secondary'" [ngClass]="['mr-2']">Close</app-button>
            <app-button (onBtnClick)="handleSubmit()">Add</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class MemberModalComponent implements OnInit, AComponent {

  memberForm: FormGroup;
  room: Room = new Room();

  @Output() close: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
  ) { 
    this.memberForm = this.formBuilder.group({
      member: ['', Validators.required, this.customValidator.bind(this)],
    });
    store.subscribe(() => {
      console.log(this.room)
      this.room = store.getState().room
    })

  }

  ngOnInit(): void {
    this.room = store.getState().room
  }

  handlClose() {
    this.close.emit('')
  }

  customValidator(
    control: FormControl
  ): Observable<{ [key: string]: boolean } | null> {
    const userEmail = control.value;

    let exists = false;
    for (let i = 0; i < this.room.getMembersProfile().length; i++) {
      if (this.room.getMembersProfile()[i].getEmail() === userEmail) {
        exists = true;
      }
    }
    return exists === true ? of({ data: true }) : of(null);
  }
  
  handleSubmit() {
    
    const email = this.memberForm.get('member')?.value;

    if (!this.memberForm.valid) return
    this.memberService.addMember({ email }, this.room.getRoomId()).subscribe((data) => {
      this.handlClose()
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
}
