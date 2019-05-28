import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'header-desktop-menu-component',
  templateUrl: './header-desktop-menu.component.html',
  styleUrls: ['./header-desktop-menu.component.scss'],
  animations: [
    trigger('indicatorFade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderDesktopMenuComponent {
  constructor(private location: Location) {}

  isPageActive(page: string): boolean {
    if (this.location.path() === `/${page}`) {
      return true;
    }
    return false;
  }
}
