import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdComponent } from '../components/ad.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-modals',
  template: `
  <div class="w-full flex justify-center items-center h-full">
    <div style="width: 30rem" class="modal-dialog p-0 rounded" role="document">
      <div class="modal-content">
        <div class="modal-header rounded-t p-4" [ngStyle]="{ background: 'purple' }">
          <div class="m-auto">
            <p class="uppercase text-white text-base w-full p-2 text-center">
            Create room
            </p>
          </div>
        </div>

        <div class="modal-body p-4">
          <div class="formField">
            <label class="formFieldLabel" htmlFor="name">Room Name</label>
            <div class="relative">
              <app-input
                (inputOnBlurEvent)="setFormData($event)"
                [name]="'name'"
              ></app-input>
            </div>
            <div class="formFieldTip"></div>
          </div>
        </div>

        <div class="modal-footer p-4 border-t border-gray-500">
          <div class="text-center flex justify-end">
            <app-button (onBtnClick)="handlClose()" [variant]="'secondary'" [ngClass]="['mr-2']">Close</app-button>
            <app-button (onBtnClick)="handleSubmit()">Create</app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class RoomModalComponent implements OnInit, AdComponent {

  newRoomForm: FormGroup;

  @Output() close: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomService,
  ) { 
    this.newRoomForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    const name: string = this.newRoomForm.get('name')!.value;
    if (!this.newRoomForm.valid) return
    this.roomService.createRoom({ name }).subscribe((data) => {
      this.handlClose()
      this.router.navigate(['dashboard']);
    });
  }

  handlClose() {
    this.close.emit('')
  }

  setFormData(data: any) {
    this.newRoomForm.get(data.name)?.patchValue(data.value);
  }
}
