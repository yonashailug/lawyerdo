import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { VideoComponent } from './video/video.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthenticationGuard } from './shared/auth/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./room/room.module').then(
        (module) => module.RoomModule
      ),
      canActivate: [AuthenticationGuard],
  },
  { 
    path: 'stream/:roomId/:type',
    component: VideoComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
