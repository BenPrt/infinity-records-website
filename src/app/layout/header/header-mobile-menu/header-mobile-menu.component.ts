import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-mobile-menu-component',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
})
export class HeaderMobileMenuComponent {
  @Output() menuClicked = new EventEmitter();

  constructor() {}

  displayMenu(): void {
    this.menuClicked.emit();
  }
}
