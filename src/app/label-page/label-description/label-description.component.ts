import { Component, Inject, PLATFORM_ID, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';

@Component({
  selector: 'label-description',
  templateUrl: './label-description.component.html',
  styleUrls: ['./label-description.component.scss'],
})
export class LabelDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser: boolean;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private deviceService: DeviceService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initDeviceType();
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngAfterViewInit(): void {
    this.initcontainerHeight();
  }

  initcontainerHeight(): void {
    if (this.isBrowser) {
      const leftHeight = document.getElementById('left-content').offsetHeight;
      if (!this.isMobile) {
        document.getElementById('description-left-layer').style.height = `${leftHeight - 56}px`;
        document.getElementById('description-right-layer').style.height = `calc(${leftHeight -
          56}px - 80px - (20.9vw / 2))`;
      } else {
        document.getElementById('right-separator').style.marginTop = `${leftHeight + 64 + 48}px`;
        const rightHeight = document.getElementById('right-description').offsetHeight;
        const totalHeight = leftHeight + 64 + 48 + rightHeight + 72;
        document.getElementById('description-left-layer').style.height = `${totalHeight}px`;
        document.getElementById('description-right-layer').style.height = `${totalHeight}px`;
      }
    }
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }
}
