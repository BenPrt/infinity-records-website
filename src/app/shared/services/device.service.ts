import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}
  isMobile: boolean;
  deviceIsMobileHasChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  setDeviceIsMobile(isMobile: boolean): void {
    this.isMobile = isMobile;
    this.deviceIsMobileHasChanged.emit(this.isMobile);
  }

  getIsMobile(): boolean {
    return this.isMobile;
  }

}
