import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInterceptor } from './app.interceptor';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from './shared/shared.module';
import { VideoComponent } from './video/video.component';
import { NewroomComponent } from './newroom/newroom.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RoomdetailComponent } from './roomdetail/roomdetail/roomdetail.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { AddmemberComponent } from './addmember/addmember.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    VideoComponent,
    NewroomComponent,
    RoomlistComponent,
    DashboardComponent,
    RoomdetailComponent,
    ProfileComponent,
    NavbarComponent,
    AddmemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
