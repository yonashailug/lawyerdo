import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorize]',
})
export class ColorizeDirective {
  @HostBinding('style.background') background: string = 'black';
  @HostBinding('style.color') color: string = 'white';
  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    this.background = 'purple';
  }
}
