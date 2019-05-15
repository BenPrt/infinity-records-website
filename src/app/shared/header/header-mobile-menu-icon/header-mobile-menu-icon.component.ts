import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-mobile-menu-icon-component',
  templateUrl: './header-mobile-menu-icon.component.html',
  styleUrls: ['./header-mobile-menu-icon.component.scss'],
})
export class HeaderMobileMenuIconComponent {
  @Output() menuClicked = new EventEmitter();

  constructor() {}

  displayMenu(): void {
    this.menuClicked.emit();
  }
}
