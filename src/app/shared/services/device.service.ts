import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}
  isMobile: boolean;
  isTablet: boolean;
  deviceIsMobileHasChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  deviceIsTabletHasChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  setDeviceIsMobile(isMobile: boolean): void {
    this.isMobile = isMobile;
    this.deviceIsMobileHasChanged.emit(this.isMobile);
  }

  setDeviceIsTablet(isTablet: boolean): void {
    this.isTablet = isTablet;
    this.deviceIsTabletHasChanged.emit(this.isTablet);
  }

  getIsMobile(): boolean {
    return this.isMobile;
  }

  getIsTablet(): boolean {
    return this.isTablet;
  }
}
