import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input.component';
import { ButtonComponent } from './components/button.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    InputComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
