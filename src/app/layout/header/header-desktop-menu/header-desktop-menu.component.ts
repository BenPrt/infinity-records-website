import { Component, Input, OnInit, OnChanges, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'header-desktop-menu-component',
  templateUrl: './header-desktop-menu.component.html',
  styleUrls: ['./header-desktop-menu.component.scss'],
  animations: [
    trigger('logoFade', [transition(':enter', [style({ opacity: 0 }), animate('800ms', style({ opacity: 1 }))])]),
    trigger('menuBorderFade', [
      state('hidden', style({ borderBottom: '1px solid #FFFFFF' })),
      state('displayed', style({ borderBottom: '1px solid #D8D8D8' })),
      transition('hidden <=> displayed', [animate('500ms')]),
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
    trigger('indicatorAnim', [
      state(
        'true',
        style({
          opacity: 1,
          width: '72px',
        }),
      ),
      state(
        'false',
        style({
          opacity: 1,
          width: 0,
        }),
      ),
      transition('true <=> false', [animate('300ms')]),
    ]),
    trigger('itemBoldAnim', [
      state(
        'true',
        style({
          fontWeight: 700,
        }),
      ),
      state(
        'false',
        style({
          fontWeight: 500,
        }),
      ),
      transition('true <=> false', [animate('300ms')]),
    ]),
  ],
})
export class HeaderDesktopMenuComponent implements OnInit, OnChanges {
  isBrowser: boolean;
  @Input() menuIsDisplayed: boolean;
  @Input() typoState: string;
  @Input() scaleState: string;
  scrolledAmount: number;
  scrollSubscription: Subscription;
  menuBorderState: string = 'displayed';

  settingsStyle: any = { display: 'block' };

  menuWrapperStyle: any = {
    position: 'initial',
    height: '204px',
  };

  menuContainerStyle: any = {
    paddingBottom: '32px',
  };

  menuLogoStyle: any = {
    height: '90px',
  };

  menuLogoTypoStyle: any = {
    fontSize: '20px',
    marginTop: '6px',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: Location,
    private scrollService: ScrollService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initAnimation();
    this.initScrollSubscription();
  }

  ngOnChanges(): void {
    this.manageScrollAndClasses(this.scrolledAmount);
    this.menuBorderState = this.menuIsDisplayed ? 'displayed' : 'hidden';
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  initAnimation(): void {
    if (this.isBrowser) {
      document.getElementById('menu-logo-logo').style.visibility = 'initial';
      if (!this.menuIsDisplayed) {
        this.drawLogo();
      }
    }
  }

  initScrollSubscription(): void {
    this.scrollSubscription = this.scrollService.scrollHappened.subscribe((amount: number) => {
      this.scrolledAmount = amount;
      this.manageScrollAndClasses(this.scrolledAmount);
    });
  }

  isPageActive(page?: string): boolean {
    if (this.location.path().split('/')[1] === page) {
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
    if (this.isBrowser) {
      if (document.body.clientHeight < document.body.scrollHeight + 68) {
        if (scroll >= 0 && scroll <= 68) {
          this.settingsStyle = { display: 'block' };
          this.menuWrapperStyle = {
            position: 'initial',
            height: '204px',
          };
          this.menuContainerStyle = {
            paddingTop: '32px',
          };
          this.menuLogoStyle = {
            height: '90px',
          };
          this.menuLogoTypoStyle = {
            height: '28px',
            fontSize: '20px',
            marginTop: '6px',
          };
        } else if (scroll > 68 && scroll <= 104) {
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
          };
          this.menuContainerStyle = {
            paddingTop: '32px',
          };
          this.menuLogoStyle = {
            height: '90px',
          };
          this.menuLogoTypoStyle = {
            height: '28px',
            fontSize: '20px',
            marginTop: '6px',
          };
        } else if (scroll > 104 && scroll <= 130) {
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
          };
          this.menuContainerStyle = {
            paddingTop: `calc(32px - ((${Math.round(scroll)}px - 104px) / 1.625)`,
          };
          this.menuLogoStyle = {
            height: '90px',
          };
          this.menuLogoTypoStyle = {
            height: `calc(28px - ((${Math.round(scroll)}px - 104px) / 0.93))`,
            fontSize: `calc(20px - ((${Math.round(scroll)}px - 104px) / 1.3))`,
            marginTop: `calc(6px - ((${Math.round(scroll)}px - 104px) / 4.33))`,
          };
        } else if (scroll > 130 && scroll <= 156) {
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(204px - (${Math.round(scroll)}px - 68px))`,
          };
          this.menuContainerStyle = {
            paddingTop: `calc(32px - ((${Math.round(scroll)}px - 104px) / 1.625)`,
          };
          this.menuLogoStyle = {
            height: `calc(90px - ((${Math.round(scroll)}px - 130px) / 1.18)`,
          };
          this.menuLogoTypoStyle = {
            height: '0px',
            fontSize: '0px',
            marginTop: '0px',
            display: 'none',
          };
        } else if (scroll > 156) {
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: '116px',
          };
          this.menuContainerStyle = {
            paddingTop: '0px',
          };
          this.menuLogoStyle = {
            height: '68px',
          };
          this.menuLogoTypoStyle = {
            height: '0px',
            fontSize: '0px',
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
          height: '28px',
          fontSize: '20px',
          marginTop: '6px',
        };
      }
    }
  }
}
