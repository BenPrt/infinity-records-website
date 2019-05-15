import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mobile-menu-component',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  @Output() arrowClicked: EventEmitter<boolean> = new EventEmitter();

  menuContent = [{ name: 'Accueil', path: '/home' }, { name: 'News', path: '' }, { name: 'Contact', path: '/contact' }];

  constructor(private router: Router) {}

  hideMenu(): void {
    this.arrowClicked.emit(true);
  }

  goTo(item): void {
    this.arrowClicked.emit(true);
    this.router.navigate([item.path]);
  }
}
