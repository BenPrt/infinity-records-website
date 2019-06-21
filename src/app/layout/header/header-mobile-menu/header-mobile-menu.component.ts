import { Component, OnInit, Input, OnChanges, Inject, PLATFORM_ID } from '@angular/core';
import { MobileMenuEventsService } from 'src/app/shared/services/mobile-menu-events.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'header-mobile-menu-component',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
  animations: [
    trigger('logoFade', [transition(':enter', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))])]),
    trigger('menuIconFade', [
      state('hidden', style({ opacity: '0' })),
      state('displayed', style({ opacity: '1' })),
      transition('hidden <=> displayed', [animate('1s')]),
    ]),
    trigger('typoFade', [
      state('hidden', style({ opacity: '0' })),
      state('displayed', style({ opacity: '1' })),
      transition('hidden <=> displayed', [animate('900ms')]),
    ]),
    trigger('scaleLogo', [
      state('upscaled', style({ marginTop: '400px', transform: 'scale(3)' })),
      state('normal', style({ marginTop: '0', transform: 'scale(1)' })),
      transition('upscaled => normal', [animate('1000ms')]),
    ]),
  ],
})
export class HeaderMobileMenuComponent implements OnInit, OnChanges {
  isBrowser: boolean;
  @Input() mobileMenuIsDisplayed: boolean;
  @Input() typoState: string;
  @Input() scaleState: string;
  menuIconState: string = 'displayed';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private mobileMenuService: MobileMenuEventsService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initLoadingAnimation();
  }

  ngOnChanges(): void {
    this.menuIconState = this.mobileMenuIsDisplayed ? 'displayed' : 'hidden';
  }

  initLoadingAnimation(): void {
    if (!this.mobileMenuIsDisplayed) {
      this.drawLogo();
    }
  }

  drawLogo(): void {
    if (this.isBrowser) {
      const paths = Array.from(document.querySelectorAll('#header-logo-logo path'));
      paths.forEach((arrayPath) => {
        const path = <SVGPathElement>arrayPath;
        const length = path.getTotalLength();
        path.style.transition = path.style.webkitTransition = 'none';
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = String(length);
        path.getBoundingClientRect();
        path.style.transition = path.style.webkitTransition = 'stroke-dashoffset 4s ease-in-out';
        path.style.strokeDashoffset = '0';
      });
    }
  }

  openMenu(): void {
    this.mobileMenuService.toggleMenu(true);
  }
}
