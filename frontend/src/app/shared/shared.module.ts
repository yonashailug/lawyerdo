import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input.component';
import { ButtonComponent } from './components/button.component';
import { ColorizeDirective } from './directive/colorize.directive';
import { ModalComponent } from './components/modal.component';
import { ModalsComponent } from './components/modals.component';
import { ModalDirective } from './directive/modal.directive';
import { RoomModalComponent } from './modals/room-modal.component';
import { EventBus } from './services/eventBus';
import { MemberModalComponent } from './modals/member-modal.component';
import { MemberService } from './services/member.service';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    ColorizeDirective,
    ModalsComponent,
    ModalComponent,
    ModalDirective,
    RoomModalComponent,
    MemberModalComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    EventBus,
    MemberService
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    ModalsComponent
  ]
})
export class SharedModule { }
