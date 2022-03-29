import { Component, OnInit } from '@angular/core';
import { MemberModalComponent } from '../modals/member-modal.component';
import { RoomModalComponent } from '../modals/room-modal.component';
import { EventBus } from '../services/eventBus';

@Component({
  selector: 'app-modals',
  template: `
    <app-modal [componentProps]="roomModal" *ngIf="keys['createRoom']" (close)="handleClose()"></app-modal>
    <app-modal [componentProps]="memberModal" *ngIf="keys['addMember']" (close)="handleClose()"></app-modal>
  `,
  styles: [
  ]
})
export class ModalsComponent implements OnInit  {

  roomModal: any = RoomModalComponent
  memberModal: any = MemberModalComponent
  isRoomOpened: boolean = false
  
  key: string = ''
  keys: any = {}

  constructor(private eventBus: EventBus) { }

  ngOnInit(): void {

    this.eventBus.eventBus.subscribe((e: string) => {
      console.log(e)
      if (e === 'createRoom') {
        this.keys['createRoom'] = true
        this.key = e
      } else if (e === 'addMember') {
        this.keys['addMember'] = true
        this.key = e
      }
    })
  }

  handleClose() {
    this.keys[this.key] = false
  }
}
