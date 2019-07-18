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
    trigger('menuBorderFade', [
      state('hidden', style({ borderBottom: '1px solid #FFFFFF' })),
      state('displayed', style({ borderBottom: '1px solid #D8D8D8' })),
      transition('hidden <=> displayed', [animate('500ms')]),
    ]),
    trigger('indicatorAnim', [
      state(
        'true',
        style({
          opacity: 1,
          width: '5vw',
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
      state('upscaled', style({ marginTop: '13.89vw', transform: 'scale(2)' })),
      state('normal', style({ marginTop: '0', transform: 'scale(1)' })),
      transition('upscaled => normal', [animate('1000ms')]),
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
    height: '14.17vw',
  };

  menuContainerStyle: any = {
    paddingBottom: '2.22vw',
  };

  menuLogoStyle: any = {
    height: '6.25vw',
  };

  menuLogoTypoStyle: any = {
    fontSize: '1.3125vw',
    marginTop: '0.42vw',
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

  initScrollSubscription() {
    this.scrollSubscription = this.scrollService.scrollHappened.subscribe((amount: number) => {
      this.scrolledAmount = amount;
      this.manageScrollAndClasses(this.scrolledAmount);
    });
  }

  isPageActive(page: string): boolean {
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
      const scrollPercent = (scroll / document.body.clientWidth) * 100;
      if (document.body.clientHeight < document.body.scrollHeight + (4.72 * document.body.clientWidth) / 100) {
        if (scrollPercent >= 0 && scrollPercent <= 4.72) {
          // X > 0 && < 4.72
          this.settingsStyle = { display: 'block' };
          this.menuWrapperStyle = {
            position: 'initial',
            height: '14.17vw',
          };
          this.menuContainerStyle = {
            paddingTop: '2.22vw',
          };
          this.menuLogoStyle = {
            height: '6.25vw',
          };
          this.menuLogoTypoStyle = {
            height: '1.94vw',
            fontSize: '1.3125vw',
            marginTop: '0.42vw',
          };
        } else if (scrollPercent > 4.72 && scrollPercent <= 7.22) {
          // X > 4.72 && X<=7.22vw
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(14.17vw - (${ scrollPercent}vw - 4.72vw))`,
          };
          this.menuContainerStyle = {
            paddingTop: '2.22vw',
          };
          this.menuLogoStyle = {
            height: '6.25vw',
          };
          this.menuLogoTypoStyle = {
            height: '1.94vw',
            fontSize: '1.3125vw',
            marginTop: '0.42vw',
          };
        } else if (scrollPercent > 7.22 && scrollPercent <= 9.03) {
          // X > 7.22vw && X <= 9.03vw
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(14.17vw - (${scrollPercent}vw - 4.72vw))`,
          };
          this.menuContainerStyle = {
            paddingTop: `calc(2.22vw - ((${scrollPercent}vw - 7.22vw) / 1.625)`,
          };
          this.menuLogoStyle = {
            height: '6.25vw',
          };
          this.menuLogoTypoStyle = {
            height: `calc(1.94vw - ((${scrollPercent}vw - 7.22vw) / 0.93))`,
            fontSize: `calc(1.3125vw - ((${scrollPercent}vw - 7.22vw) / 1.38))`,
            marginTop: `calc(0.42vw - ((${scrollPercent}vw - 7.22vw) / 4.33))`,
          };
        } else if (scrollPercent > 9.03 && scrollPercent <= 10.83) {
          // X > 9.03vw && X <= 10.83vw
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: `calc(14.17vw - (${scrollPercent}vw - 4.72vw))`,
          };
          this.menuContainerStyle = {
            paddingTop: `calc(2.22vw - ((${ scrollPercent}vw - 7.22vw) / 1.625)`,
          };
          this.menuLogoStyle = {
            height: `calc(6.25vw - ((${ scrollPercent}vw - 9.03vw) / 1.18)`,
          };
          this.menuLogoTypoStyle = {
            height: '0px',
            fontSize: '0px',
            marginTop: '0px',
            display: 'none',
          };
        } else if (scrollPercent > 10.83) {
          // 10.83vw
          this.settingsStyle = { display: 'none' };
          this.menuWrapperStyle = {
            position: 'fixed',
            zIndex: '5',
            height: '8.05vw',
          };
          this.menuContainerStyle = {
            paddingTop: '0px',
          };
          this.menuLogoStyle = {
            height: '4.72vw',
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
          height: '14.17vw',
        };
        this.menuContainerStyle = {
          paddingTop: '2.22vw',
        };
        this.menuLogoTypoStyle = {
          height: '1.94vw',
          fontSize: '1.3125vw',
          marginTop: '0.42vw',
        };
      }
    }
  }
}
