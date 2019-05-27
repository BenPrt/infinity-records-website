import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import 'hammerjs';

import { DeviceUtils } from 'src/app/utils/device-utils';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [],
})
export class AppComponent implements OnInit {
  reloading: boolean = false;
  animateLogo: boolean = true;
  contentDisplayed: boolean = false;
  menuDisplayed: boolean = false;
  isMobile: boolean = false;
  routerSubscription: Subscription;

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
    if (path !== '/home' && path !== '') {
      this.animateLogo = false;
    }
  }

  subscribeToLanguageChange() {
    this.translationService.resourcesLoaded.subscribe(() => {
      this.reloading = true;
      this.cd.detectChanges();
      this.reloading = false;
      this.cd.detectChanges();
      this.cd.markForCheck();
    });
  }

  displayMenu(): void {
    this.menuDisplayed = true;
  }

  hideMenu(): void {
    this.menuDisplayed = false;
  }
}
