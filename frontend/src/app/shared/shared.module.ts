import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input.component';
import { ButtonComponent } from './components/button.component';
import { ColorizeDirective } from './directive/colorize.directive';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    ColorizeDirective
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
