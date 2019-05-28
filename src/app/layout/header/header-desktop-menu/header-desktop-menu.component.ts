import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'header-desktop-menu-component',
  templateUrl: './header-desktop-menu.component.html',
  styleUrls: ['./header-desktop-menu.component.scss'],
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
