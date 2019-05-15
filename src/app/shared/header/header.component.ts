import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { interval } from 'rxjs';

import { DeviceUtils } from 'src/app/utils/device-utils';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('loading-animation', [
      state(
        'desktop-menu-toFade',
        style({
          opacity: 0,
        }),
      ),
      state(
        'desktop-menu-faded',
        style({
          opacity: 1,
        }),
      ),
      transition('desktop-menu-toFade => desktop-menu-faded', animate('2s ease-in')),

      state(
        'desktop-headerLogo-toScale',
        style({
          margin: '10% auto 0 auto',
          width: '100%',
        }),
      ),
      state(
        'desktop-headerLogo-scaled',
        style({
          margin: '1% auto 0 auto',
          width: '35%',
        }),
      ),
      transition('desktop-headerLogo-toScale => desktop-headerLogo-scaled', animate('2s ease-out')),

      state(
        'mobile-menu-toFade',
        style({
          opacity: 0,
        }),
      ),
      state(
        'mobile-menu-faded',
        style({
          opacity: 1,
        }),
      ),
      transition('mobile-menu-toFade => mobile-menu-faded', animate('0.5s ease-in')),

      state(
        'mobile-headerLogo-toScale',
        style({
          margin: '50% auto 0 auto',
          width: '100%',
        }),
      ),
      state(
        'mobile-headerLogo-scaled',
        style({
          margin: '3% auto 0 auto',
          width: '50%',
        }),
      ),
      transition('mobile-headerLogo-toScale => mobile-headerLogo-scaled', animate('1s ease-out')),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Input() animateLogo: boolean;
  @Output() menuClicked: EventEmitter<boolean> = new EventEmitter();
  menuAnimationState: string = 'desktop-menu-toFade';
  headerLogoAnimationState: string = 'desktop-headerLogo-toScale';
  isMobile: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.initDeviceType();
    this.initAnimation();
  }

  initDeviceType(): void {
    if (DeviceUtils.isMobile()) {
      this.isMobile = true;
      this.menuAnimationState = 'mobile-menu-toFade';
    }
  }

  initAnimation(): void {
    if (this.animateLogo) {
      this.headerLogoAnimationState = this.isMobile ? 'mobile-headerLogo-toScale' : 'desktop-headerLogo-toScale';
      interval(5000).subscribe(() => {
        this.headerLogoAnimationState = this.isMobile ? 'mobile-headerLogo-scaled' : 'desktop-headerLogo-scaled';
        interval(1000).subscribe(() => {
          this.menuAnimationState = this.isMobile ? 'mobile-menu-faded' : 'desktop-menu-faded';
        });
      });
    } else {
      this.headerLogoAnimationState = this.isMobile ? 'mobile-headerLogo-scaled' : 'desktop-headerLogo-scaled';
      this.menuAnimationState = this.isMobile ? 'mobile-menu-faded' : 'desktop-menu-faded';
    }
  }

  menuHasBeenClicked(): void {
    this.menuClicked.emit(true);
  }
}
