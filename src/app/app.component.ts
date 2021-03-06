import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Location, isPlatformBrowser, PlatformLocation } from '@angular/common';
import { Router, RouterEvent } from '@angular/router';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { MobileMenuEventsService } from './shared/services/mobile-menu-events.service';
import { DeviceService } from './shared/services/device.service';
import { ScrollService } from './shared/services/scroll.service';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:scroll)': 'onWindowScroll()',
    '(document:keydown.space)': 'interruptAnimation($event)',
  },
  animations: [
    trigger('contentFade', [
      transition(':enter', [style({ opacity: '0' }), animate('1000ms', style({ opacity: '1' }))]),
      transition(':leave', [style({ opacity: '1' }), animate('1000ms', style({ opacity: '0' }))]),
    ]),
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
  @ViewChild('container', { static: false }) content: ElementRef;
  // Boolean defining if the app is executed by browser and not by server
  isBrowser: boolean;
  // Boolean defining if the page is reloading (due to instant translation)
  reloading: boolean = false;
  // Boolean defining if the device is a mobile device or not
  isMobile: boolean = false;
  // Boolean defining if the device is a tablet device or not
  isTablet: boolean = false;
  // Boolean defining is we trigger the animation, depending on which page the user access
  animateLogo: boolean = true;
  // Table containing all occuring timeouts
  timeouts = [];
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

  resizeSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef,
    private deviceService: DeviceService,
    private translationService: TranslationService,
    private mobileMenuService: MobileMenuEventsService,
    private scrollService: ScrollService,
    private platformLocation: PlatformLocation,
    private meta: Meta,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    platformLocation.onPopState((event: PopStateEvent) => {
      if (this.mobileMenuIsDisplayed) {
        this.mobileMenuIsDisplayed = false;
      }
    });
  }

  ngOnInit(): void {
    this.initScrollOnRouteChange();
    this.initMobileStatus();
    this.initAnimationState();
    this.initLanguageChangeSubscription();
    this.initMobileMenuSubscription();
  }

  ngAfterViewInit(): void {
    this.initMobileSizing();
    this.initMobileScroll();
    if (!this.isBrowser) {
      const source: Observable<any> = fromEvent(this.content.nativeElement, 'load');
      const result: Subscription = source.pipe(debounceTime(1000)).subscribe(() => {
        this.interruptAnimation();
        result.unsubscribe();
      });
    }
  }

  initScrollOnRouteChange(): void {
    if (this.isBrowser) {
      if (navigator.userAgent.indexOf('Firefox') > -1) {
        document.getElementsByTagName('body')[0].style.scrollBehavior = 'smooth';
      } else {
        document.querySelector('html').style.scrollBehavior = 'smooth';
      }
      this.router.events.subscribe((evt: RouterEvent) => {
        if (this.isMobile) {
          const scrollableElement: HTMLElement = document.querySelector('#mobile-page-content');
          if (scrollableElement) {
            scrollableElement.scrollTo(0, 0);
          }
        } else {
          window.scrollTo(0, 0);
        }
      });
    }
  }

  initMobileStatus(): void {
    if (this.isBrowser) {
      const userAgent = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(userAgent)) {
        if (document.body.clientWidth > 1299) {
          this.isTablet = true;
          this.isMobile = false;
        } else {
          this.isTablet = false;
          this.isMobile = true;
        }
        this.initMobileScroll();
      } else {
        this.isMobile = false;
      }
      this.deviceService.setDeviceIsMobile(this.isMobile);
      this.deviceService.setDeviceIsTablet(this.isTablet);
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
        this.defineViewPortSize();
        const source = fromEvent(window, 'resize');
        this.resizeSubscription = source.pipe(debounceTime(100)).subscribe(() => {
          this.defineViewPortSize();
        });

        const bodyElement = document.body;
        bodyElement.classList.add('mobile-body');
      }
    }
  }

  defineViewPortSize(): void {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const headerHeight = document.getElementsByTagName('header-mobile-menu-component')[0].clientHeight;
    const contentvh = (window.innerHeight - headerHeight) * 0.01;
    document.documentElement.style.setProperty('--contentvh', `${contentvh}px`);
  }

  initAnimationState(): void {
    const path = this.location.path();
    if (path === '' || path.substring(0, 1) === '?') {
      this.initMenuAnimation();
      this.defineMetadata();
    }
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.updateTag({
      name: 'title',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_TITLE')}`,
    });
    this.meta.updateTag({
      name: 'description',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_DESCRIPTION')}`,
    });
    this.meta.updateTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_HOMEPAGE_KEYWORDS')}` });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:url',
      content: 'https://infinity-records.fr/',
    });
    this.meta.updateTag({ prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:title',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_TITLE')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:description',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_DESCRIPTION')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:image',
      content: 'https://infinity-records.fr/assets/img/home/banner.jpg',
    });
  }

  initMenuAnimation(): void {
    if (this.isBrowser) {
      this.scaleState = 'upscaled';
      this.typoState = 'hidden';
      this.menuIsDisplayed = false;
      this.contentIsDisplayed = false;
      this.timeouts.push(
        setTimeout(() => {
          // We display the typo
          this.typoState = 'displayed';
          this.timeouts.push(
            setTimeout(() => {
              // We unscale the logo
              this.scaleState = 'normal';
              this.timeouts.push(
                setTimeout(() => {
                  // We display menu and content
                  this.menuIsDisplayed = true;
                  this.contentIsDisplayed = true;
                }, 1050),
              );
            }, 1000),
          );
        }, 5000),
      );
    } else {
      this.scaleState = 'upscaled';
      this.typoState = 'hidden';
      this.menuIsDisplayed = false;
      this.contentIsDisplayed = false;
    }
  }

  initLanguageChangeSubscription(): void {
    this.translationService.resourcesLoaded.subscribe(() => {
      if (this.mobileMenuIsDisplayed) {
        this.mobileMenuIsDisplayed = false;
      }
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

  onWindowScroll(): void {
    this.scrolledAmount = window.pageYOffset;
    this.scrollService.setScrolledAmount(this.scrolledAmount);
    if (this.scrolledAmount >= 0 && this.scrolledAmount <= 68) {
      this.contentOffset = '0';
    } else if (this.scrolledAmount > 68 && this.scrolledAmount <= 156) {
      this.contentOffset = '273px';
    }
  }

  parseTap(evt): void {
    if (evt.tapCount === 2) {
      this.interruptAnimation(evt);
    }
  }

  interruptAnimation(event?: PointerEvent | KeyboardEvent): boolean {
    if (!this.menuIsDisplayed) {
      if (event) {
        event.preventDefault();
      }
      this.timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
      this.scaleState = 'normal';
      if (this.isMobile) {
        setTimeout(() => {
          this.typoState = 'displayed';
          this.menuIsDisplayed = true;
          this.contentIsDisplayed = true;
        }, 1000);
      } else {
        this.typoState = 'displayed';
        this.menuIsDisplayed = true;
        this.contentIsDisplayed = true;
      }
    }
    return true;
  }

  openMobileMenu(): void {
    this.mobileMenuService.toggleMenu(true);
  }

  closeMobileMenu(): void {
    this.mobileMenuService.toggleMenu(false);
  }
}
