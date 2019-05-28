import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import 'hammerjs';

import { DeviceUtils } from 'src/app/utils/device-utils';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('contentFade', [
      transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  // Boolean defining if the page is reloading (due to instant translation)
  reloading: boolean = false;
  // Boolean defining if the device is a mobile device or not
  isMobile: boolean = false;
  // Boolean defining is we trigger the animation, depending on which page the user access
  animateLogo: boolean = true;
  // Boolean and variable defining the states during the animation
  scaleState: string = 'normal';
  typoState: string = 'displayed';
  menuIsDisplayed: boolean = true;
  contentIsDisplayed: boolean = true;
  // Boolean defining if the mobile menu is displayed
  mobileMenuIsDisplayed: boolean = false;

  constructor(
    private location: Location,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.initMobileStatus();
    this.initAnimationState();
    this.subscribeToLanguageChange();
  }

  initMobileStatus(): void {
    this.isMobile = DeviceUtils.isMobile();
  }

  initAnimationState(): void {
    const path = this.location.path();
    if (path === '/home' || path === '') {
      this.initMenuAnimation();
    }
  }

  initMenuAnimation(): void {
    this.scaleState = 'upscaled';
    this.typoState = 'hidden';
    this.menuIsDisplayed = false;
    this.contentIsDisplayed = false;
    setInterval(() => {
      // We display the typo
      this.typoState = 'displayed';
      setInterval(() => {
        // We unscale the logo
        this.scaleState = 'normal';
        setInterval(() => {
          // We display menu and content
          this.menuIsDisplayed = true;
          this.contentIsDisplayed = true;
        }, 1050);
      }, 1000);
    }, 5000);
  }

  subscribeToLanguageChange() {
    this.translationService.resourcesLoaded.subscribe(() => {
      this.reloading = true;
      this.cd.detectChanges();
      this.cd.markForCheck();
      setInterval(() => {
        this.reloading = false;
      }, 500);
    });
  }

  displayMobileMenu(): void {
    this.mobileMenuIsDisplayed = true;
  }

  hideMobileMenu(): void {
    this.mobileMenuIsDisplayed = false;
  }
}
