import { Component } from '@angular/core';
import { MobileMenuEventsService } from 'src/app/shared/services/mobile-menu-events.service';

@Component({
  selector: 'header-mobile-menu-component',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
})
export class HeaderMobileMenuComponent {
  constructor(private mobileMenuService: MobileMenuEventsService) {}

  openMenu(): void {
    this.mobileMenuService.toggleMenu(true);
  }
}
