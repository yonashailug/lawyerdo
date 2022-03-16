import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from '../directive/modal.directive';
import { AComponent } from './a.component';

@Component({
  selector: 'app-modal',
  template: `
  <div class="scrollOverlay">
    <div [ngClass]="['clickableOverlay', variant]">
      <div [ngStyle]="{width: '30rem'}" [ngClass]="['modal', variant]">
        <ng-template modalHost (close)="handleClose()"></ng-template>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    `
  ]
})
export class ModalComponent implements OnInit {

  @Input() variant: string = 'center'
  @ViewChild(ModalDirective, { static: true }) public modalHost!: ModalDirective;
  @Input() componentProps: any
  @Input() width: number = 600

  @Output() close: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.loadComponent()
  }

  loadComponent() {

    const viewContainerRef: ViewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef: any = viewContainerRef.createComponent<AComponent>(this.componentProps);
    componentRef.instance.close.subscribe((e: any) => {
      this.handleClose(e)
    })
  }

  modalStyles() {
    return { '--width': `${this.width}px` };
  }

  handleClose(type: string) {
    this.close.emit(type)
  }
}
