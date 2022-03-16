import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { NewroomComponent } from './newroom/newroom.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from '../app.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddmemberComponent } from './addmember/addmember.component';
import { RoomdetailComponent } from './roomdetail/roomdetail.component';



@NgModule({
  declarations: [
    NewroomComponent,
    AddmemberComponent,
    RoomlistComponent,
    RoomdetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'create', component: NewroomComponent},
    ])
  ],
  exports : [
    RoomlistComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
})
export class RoomModule { }
