import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { animate, style, transition, trigger, state } from '@angular/animations';
import 'hammerjs';

import { DeviceUtils } from 'src/app/utils/device-utils';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { MobileMenuEventsService } from './shared/services/mobile-menu-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('contentFade', [transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))])]),
    trigger('overlayFade', [
      transition(':enter', [style({ opacity: '0' }), animate('300ms', style({ opacity: '0.6' }))]),
      transition(':leave', [style({ opacity: '0.6' }), animate('300ms', style({ opacity: '0' }))]),
    ]),
    trigger('mobileMenuFade', [
      transition(':enter', [style({ left: '-346px' }), animate('350ms', style({ left: '0' }))]),
      transition(':leave', [style({ left: '0' }), animate('350ms', style({ left: '-346px' }))]),
    ]),
    trigger('menuBorderFade', [
      state('false', style({ borderBottom: '1px solid #FFFFFF' })),
      state('true', style({ borderBottom: '1px solid #D8D8D8' })),
      transition('false <=> true', [animate('500ms')]),
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
  // Number of pixels scrolled
  scrolledAmount: number = 0;
  // Boolean defining if the mobile menu is displayed
  mobileMenuIsDisplayed: boolean = false;
  // Offset amount to add to the page content when the header is sticky
  contentOffset: string = '0';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.scrolledAmount = window.pageYOffset;
    if (this.scrolledAmount >= 0 && this.scrolledAmount <= 68) {
      this.contentOffset = '0';
    } else if (this.scrolledAmount > 68 && this.scrolledAmount <= 156) {
      this.contentOffset = '273px';
    }
  }

  constructor(
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
    private mobileMenuService: MobileMenuEventsService,
  ) {}

  ngOnInit(): void {
    this.initScrollOnRouteChange();
    this.initMobileStatus();
    this.initMobileSizing();
    this.initAnimationState();
    this.initLanguageChangeSubscription();
    this.initMobileMenuSubscription();
  }

  initScrollOnRouteChange(): void {
    this.router.events.subscribe((evt: RouterEvent) => {
      let scrollTo: number;
      const scrollInterval = setInterval(() => {
        if (this.scrolledAmount > 0) {
          scrollTo = this.scrolledAmount - this.scrolledAmount / 4;
          window.scrollTo(0, scrollTo);
        } else {
          clearInterval(scrollInterval);
        }
      }, 10);
    });
  }

  initMobileStatus(): void {
    this.isMobile = DeviceUtils.isMobile();
  }

  initMobileSizing(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const contentvh = (window.innerHeight - 81) * 0.01;
    document.documentElement.style.setProperty('--contentvh', `${contentvh}px`);
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      const contentvh = (window.innerHeight - 81) * 0.01;
      document.documentElement.style.setProperty('--contentvh', `${contentvh}px`);
    });
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
    setTimeout(() => {
      // We display the typo
      this.typoState = 'displayed';
      setTimeout(() => {
        // We unscale the logo
        this.scaleState = 'normal';
        setTimeout(() => {
          // We display menu and content
          this.menuIsDisplayed = true;
          this.contentIsDisplayed = true;
        }, 1050);
      }, 1000);
    }, 5000);
  }

  initLanguageChangeSubscription(): void {
    this.translationService.resourcesLoaded.subscribe(() => {
      this.reloading = true;
      this.cd.detectChanges();
      this.cd.markForCheck();
      setTimeout(() => {
        this.reloading = false;
      }, 500);
    });
  }

  initMobileMenuSubscription(): void {
    this.mobileMenuService.toggleMobileMenu.subscribe((displayValue: boolean) => {
      this.mobileMenuIsDisplayed = displayValue;
    });
  }

  openMobileMenu(): void {
    this.mobileMenuService.toggleMenu(true);
  }

  closeMobileMenu(): void {
    this.mobileMenuService.toggleMenu(false);
  }
}
