import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merchInfos } from 'src/assets/content/merch-content';

@Injectable({
  providedIn: 'root',
})
export class MerchService {
  constructor(private http: HttpClient) {}
  currentPageId: number;
  currentPageIdHasChanged: EventEmitter<number> = new EventEmitter<number>();

  setCurrentPageId(id: number): void {
    this.currentPageId = id;
    this.currentPageIdHasChanged.emit(this.currentPageId);
  }

  getCurrentPageId(): number {
    return this.currentPageId;
  }

  goToNextPage(): void {
    let newId: number = this.currentPageId;
    if (this.currentPageId < merchInfos.length - 1) {
      newId += 1;
    }
    this.setCurrentPageId(newId);
  }

  goToPreviousPage(): void {
    let newId: number = this.currentPageId;
    if (this.currentPageId > 0) {
      newId -= 1;
    }
    this.setCurrentPageId(newId);
  }
}
