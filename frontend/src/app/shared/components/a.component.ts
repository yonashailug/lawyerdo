import { EventEmitter } from "@angular/core";

export interface AComponent {
  close: EventEmitter<string>;
}
