import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnChanges,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { filter, first } from 'rxjs/operators';

import { TranslationService } from 'src/app/shared/services/translation.service';
import { MobileMenuEventsService } from './shared/services/mobile-menu-events.service';
import { DeviceService } from './shared/services/device.service';
import { ScrollService } from './shared/services/scroll.service';

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
export class AppComponent implements OnInit, AfterViewInit {
  // Boolean defining if the app is executed by browser and not by server
  isBrowser: boolean;
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
    this.scrollService.setScrolledAmount(this.scrolledAmount);
    if (this.scrolledAmount >= 0 && this.scrolledAmount <= 68) {
      this.contentOffset = '0';
    } else if (this.scrolledAmount > 68 && this.scrolledAmount <= 156) {
      this.contentOffset = '273px';
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef,
    private deviceService: DeviceService,
    private translationService: TranslationService,
    private mobileMenuService: MobileMenuEventsService,
    private scrollService: ScrollService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initDisplay();
    this.initScrollOnRouteChange();
    this.initMobileStatus();
    this.initMobileSizing();
    this.initAnimationState();
    this.initLanguageChangeSubscription();
    this.initMobileMenuSubscription();
  }

  ngAfterViewInit(): void {
    this.initMobileScroll();
  }

  initDisplay(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        first(),
      )
      .subscribe(() => {
        if (this.isBrowser) {
          document.getElementsByTagName('body')[0].style.visibility = 'initial';
        }
      });
  }

  initScrollOnRouteChange(): void {
    if (this.isBrowser) {
      this.router.events.subscribe((evt: RouterEvent) => {
        if (this.isMobile) {
          const scrollableElement = document.querySelector('#mobile-page-content');
          if (scrollableElement) {
            scrollableElement.scrollTo(0, 0);
          }
        } else {
          let scrollTo: number;
          const scrollInterval = setInterval(() => {
            if (this.scrolledAmount > 0) {
              scrollTo = this.scrolledAmount - this.scrolledAmount / 4;
              window.scrollTo(0, scrollTo);
            } else {
              clearInterval(scrollInterval);
            }
          }, 10);
        }
      });
    }
  }

  initMobileStatus(): void {
    if (this.isBrowser) {
      const userAgent = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
        this.isMobile = true;
        this.initMobileScroll();
      } else {
        this.isMobile = false;
      }
      this.deviceService.setDeviceIsMobile(this.isMobile);
    }
  }

  initMobileScroll(): void {
    if (this.isBrowser && this.isMobile) {
      const mobilePageEl = document.getElementById('mobile-page-content');
      if (mobilePageEl) {
        mobilePageEl.addEventListener('scroll', () => {
          this.scrolledAmount = mobilePageEl.scrollTop;
          this.scrollService.setScrolledAmount(this.scrolledAmount);
        });
      }
    }
  }

  initMobileSizing(): void {
    if (this.isBrowser) {
      if (this.isMobile) {
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

        const bodyElement = document.body;
        bodyElement.classList.add('mobile-body');
      }
    }
  }

  initAnimationState(): void {
    const path = this.location.path();
    if (path === '/home' || path === '') {
      this.initMenuAnimation();
    }
  }

  initMenuAnimation(): void {
    if (this.isBrowser) {
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
  }

  initLanguageChangeSubscription(): void {
    this.translationService.resourcesLoaded.subscribe(() => {
      this.reloading = true;
      this.cd.detectChanges();
      this.cd.markForCheck();
      if (this.isBrowser) {
        setTimeout(() => {
          this.reloading = false;
        }, 500);
      } else {
        this.reloading = false;
      }
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
