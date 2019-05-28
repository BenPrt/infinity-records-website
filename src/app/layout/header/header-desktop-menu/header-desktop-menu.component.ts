import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'header-desktop-menu-component',
  templateUrl: './header-desktop-menu.component.html',
  styleUrls: ['./header-desktop-menu.component.scss'],
  animations: [
    trigger('indicatorFade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('logoFade', [
      transition(':enter', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))]),
    ]),
    trigger('menuFade', [
      transition(':enter', [style({ opacity: 0 }), animate('1s', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('1s', style({ opacity: 0 }))]),
    ]),
    trigger('typoFade', [
      state('hidden', style({ opacity: '0' })),
      state('displayed', style({ opacity: '1' })),
      transition('hidden <=> displayed', [animate('900ms')]),
    ]),
    trigger('scaleLogo', [
      state('upscaled', style({ marginTop : '200px', transform: 'scale(2)' })),
      state('normal', style({ marginTop : '0', transform: 'scale(1)' })),
      transition('upscaled => normal', [animate('1000ms')]),
    ]),
  ],
})
export class HeaderDesktopMenuComponent {
  constructor(private location: Location) {}
  @Input() menuIsDisplayed: boolean;
  @Input() typoState: string;
  @Input() scaleState: string;

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    if (!this.menuIsDisplayed) {
      this.drawLogo();
    }
  }

  isPageActive(page: string): boolean {
    if (this.location.path() === `/${page}`) {
      return true;
    }
    return false;
  }

  drawLogo(): void {
    const paths = Array.from(document.querySelectorAll('#menu-logo-logo path'));
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
