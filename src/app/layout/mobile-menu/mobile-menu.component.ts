import { Component } from '@angular/core';
import { MobileMenuEventsService } from 'src/app/shared/services/mobile-menu-events.service';

@Component({
  selector: 'mobile-menu-component',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  constructor(private mobileMenuService: MobileMenuEventsService) {}

  closeMenu(): void {
    this.mobileMenuService.toggleMenu(false);
  }
}
