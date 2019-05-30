import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'header-desktop-menu-component',
  templateUrl: './header-desktop-menu.component.html',
  styleUrls: ['./header-desktop-menu.component.scss'],
  animations: [
    trigger('menuBorderFade', [
      state('hidden', style({ borderBottom: '1px solid #FFFFFF' })),
      state('displayed', style({ borderBottom: '1px solid #D8D8D8' })),
      transition('hidden <=> displayed', [animate('500ms')]),
    ]),
    trigger('indicatorFade', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('logoFade', [transition(':enter', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))])]),
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
      state('upscaled', style({ marginTop: '200px', transform: 'scale(2)' })),
      state('normal', style({ marginTop: '0', transform: 'scale(1)' })),
      transition('upscaled => normal', [animate('1000ms')]),
    ]),
  ],
})
export class HeaderDesktopMenuComponent implements OnInit, OnChanges {
  constructor(private location: Location) {}
  @Input() menuIsDisplayed: boolean;
  @Input() typoState: string;
  @Input() scaleState: string;
  @Input() scrolledAmount: number;
  menuBorderState: string = 'displayed';

  settingsStyle: any = { display: 'block' };

  menuWrapperStyle: any = {
    position: 'initial',
    height: '204px',
  };

  menuContainerStyle: any = {
    paddingBottom: '32px',
  };

  menuLogoTypoStyle: any = {
    height: '17px',
    marginTop: '9px',
  };

  ngOnInit(): void {
    this.initAnimation();
  }

  ngOnChanges(): void {
    this.manageScrollAndClasses(this.scrolledAmount);
    this.menuBorderState = this.menuIsDisplayed ? 'displayed' : 'hidden';
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

  manageScrollAndClasses(scroll: number): void {
    if (document.body.clientHeight < (document.body.scrollHeight + 68)) {
      if (scroll > 0 && scroll <= 68) {
        this.settingsStyle = { display: 'block' };
        this.menuWrapperStyle = {
          position: 'initial',
          height: '204px',
        };
        this.menuContainerStyle = {
          paddingTop: '32px',
        };
        this.menuLogoTypoStyle = {
          height: '17px',
          marginTop: '9px',
        };
      } else if (scroll > 68 && scroll <= 104) {
        this.settingsStyle = { display: 'none' };
        this.menuWrapperStyle = {
          position: 'fixed',
          height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
        };
        this.menuContainerStyle = {
          paddingTop: '32px',
        };
        this.menuLogoTypoStyle = {
          height: '17px',
          marginTop: '9px',
        };
      } else if (scroll > 104 && scroll <= 130) {
        this.settingsStyle = { display: 'none' };
        this.menuWrapperStyle = {
          position: 'fixed',
          height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
        };
        this.menuContainerStyle = {
          paddingTop: `calc(32px - ((${Math.round(scroll)}px - 104px) / 1.625)`,
        };
        this.menuLogoTypoStyle = {
          height: `calc(17px - ((${Math.round(scroll)}px - 104px) / 1.53))`,
          marginTop: `calc(9px - ((${Math.round(scroll)}px - 104px) / 2.88))`,
        };
      } else if (scroll > 130 && scroll <= 156) {
        this.settingsStyle = { display: 'none' };
        this.menuWrapperStyle = {
          position: 'fixed',
          height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
        };
        this.menuContainerStyle = {
          paddingTop: `calc(32px - ((${Math.round(scroll)}px - 104px) / 1.625)`,
        };
        this.menuLogoTypoStyle = {
          height: '0px',
          marginTop: '0px',
          display: 'none',
        };
      } else if (scroll > 156) {
        this.settingsStyle = { display: 'none' };
        this.menuWrapperStyle = {
          position: 'fixed',
          height: '116px',
        };
        this.menuContainerStyle = {
          paddingTop: '0px',
        };
        this.menuLogoTypoStyle = {
          height: '0px',
          marginTop: '0px',
          display: 'none',
        };
      }
    } else {
      this.settingsStyle = { display: 'block' };
      this.menuWrapperStyle = {
        position: 'initial',
        height: '204px',
      };
      this.menuContainerStyle = {
        paddingTop: '32px',
      };
      this.menuLogoTypoStyle = {
        height: '17px',
        marginTop: '9px',
      };
    }
  }
}
