import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[modalHost]',
})
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
