import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}
  scrolledAmount: number;
  scrollHappened: EventEmitter<number> = new EventEmitter<number>();

  setScrolledAmount(amount: number): void {
    this.scrolledAmount = amount;
    this.scrollHappened.emit(this.scrolledAmount);
  }

  getScrolledAmount(): number {
    return this.scrolledAmount;
  }

}
