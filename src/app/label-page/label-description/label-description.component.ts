import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'label-description',
  templateUrl: './label-description.component.html',
  styleUrls: ['./label-description.component.scss'],
})
export class LabelDescriptionComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    this.initcontainerHeight();
  }

  initcontainerHeight(): void {
    if (this.isBrowser) {
      const totalHeight = document.getElementById('left-content').offsetHeight;
      document.getElementById('description-left-layer').style.height = `${totalHeight - 56}px`;
      document.getElementById('description-right-layer').style.height = `calc(${totalHeight -
        56}px - 80px - (20.9vw / 2))`;
    }
  }
}
