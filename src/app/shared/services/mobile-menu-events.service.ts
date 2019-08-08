import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileMenuEventsService {
  toggleMobileMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  toggleMenu(displayValue: boolean): void {
    this.toggleMobileMenu.emit(displayValue);
  }
}
