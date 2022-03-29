import { EventEmitter } from "@angular/core";

export interface AdComponent {
  close: EventEmitter<string>;
}
