import { Component } from '@angular/core';

@Component({
  selector: 'header-mobile-menu-component',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
})
export class HeaderMobileMenuComponent {
  constructor() {}

  openMenu(): void {
    console.log('open menu');
  }
}
