import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import 'hammerjs';

import { DeviceUtils } from 'src/app/utils/device-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loading-animation', [
      state(
        'content-toFade',
        style({
          opacity: 0,
        }),
      ),
      state(
        'content-faded',
        style({
          opacity: 1,
        }),
      ),
      transition('content-toFade => content-faded', animate('2s ease-in')),
    ]),

    trigger('displayMenu-animation', [
      state(
        'hiddenMenu',
        style({
          left: '-70%',
        }),
      ),
      state(
        'displayedMenu',
        style({
          left: 0,
        }),
      ),
      transition('hiddenMenu <=> displayedMenu', animate('0.4s ease-out')),

      state(
        'hiddenMenu_overlay',
        style({
          opacity: 0,
          display: 'none',
        }),
      ),
      state(
        'displayedMenu_overlay',
        style({
          opacity: 0.3,
          display: 'block',
        }),
      ),
      transition('hiddenMenu_overlay <=> displayedMenu_overlay', animate('0.4s ease-out')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  animateLogo: boolean = true;
  contentAnimationState: string = 'content-toFade';
  contentDisplayed: boolean = false;
  menuDisplayed: boolean = false;
  displayMenuState: string = 'hiddenMenu';
  overlayState: string = 'hiddenMenu_overlay';
  isMobile: boolean = false;
  routerSubscription: Subscription;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.initMobileStatus();
    this.initAnimationState();
  }

  initMobileStatus(): void {
    this.isMobile = DeviceUtils.isMobile();
  }

  initAnimationState(): void {
    const path = this.location.path();
    if (path !== '/home' && path !== '') {
      this.animateLogo = false;
      this.contentAnimationState = 'content-faded';
      this.contentDisplayed = true;
    } else {
      interval(7000).subscribe(() => {
        this.contentAnimationState = 'content-faded';
        this.contentDisplayed = true;
      });
    }
  }

  onSwipeLeft(): void {
    this.hideMenu();
  }

  onSwipeRight(): void {
    this.displayMenu();
  }

  displayMenu(): void {
    this.menuDisplayed = true;
    this.displayMenuState = 'displayedMenu';
    this.overlayState = 'displayedMenu_overlay';
  }

  hideMenu(): void {
    this.menuDisplayed = false;
    this.displayMenuState = 'hiddenMenu';
    this.overlayState = 'hiddenMenu_overlay';
  }
}
