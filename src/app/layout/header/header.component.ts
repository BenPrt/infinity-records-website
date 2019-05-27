import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DeviceUtils } from 'src/app/utils/device-utils';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit {
  @Input() animateLogo: boolean;
  @Output() menuClicked: EventEmitter<boolean> = new EventEmitter();
  isMobile: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initDeviceType();
  }

  initDeviceType(): void {
    if (DeviceUtils.isMobile()) {
      this.isMobile = true;
    }
  }

  menuHasBeenClicked(): void {
    this.menuClicked.emit(true);
  }
}
