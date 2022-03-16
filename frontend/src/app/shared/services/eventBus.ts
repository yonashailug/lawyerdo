import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventBus {
  
  eventBus: EventEmitter<string> = new EventEmitter()
  constructor() {}

}
