import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-linking',
  templateUrl: './home-linking.component.html',
  styleUrls: ['./home-linking.component.scss'],
})
export class HomeLinkingComponent {
  @Input() isMobile: boolean;
  constructor() {}
}
