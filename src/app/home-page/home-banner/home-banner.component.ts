import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent {
  @Input() isMobile: boolean;
  constructor() {}
}
