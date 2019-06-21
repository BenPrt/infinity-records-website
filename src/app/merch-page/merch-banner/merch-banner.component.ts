import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';
import { DeviceService } from 'src/app/shared/services/device.service';

@Component({
  selector: 'merch-banner',
  templateUrl: './merch-banner.component.html',
  styleUrls: ['./merch-banner.component.scss'],
})
export class MerchBannerComponent implements OnInit, OnDestroy {
  currentProductId: number;
  currentIdSubscription: Subscription;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  constructor(private merchService: MerchService, private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.initCurrentProductId();
    this.initDeviceType();
  }

  initCurrentProductId(): void {
    this.currentProductId = this.merchService.getCurrentPageId();
    this.currentIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId: number) => {
      this.currentProductId = currentId;
    });
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy(): void {
    this.currentIdSubscription.unsubscribe();
    this.deviceTypeSubscription.unsubscribe();
  }

  isDisabled(direction: string): boolean {
    if (
      (direction === 'previous' && this.currentProductId === 0) ||
      (direction === 'next' && this.currentProductId === merchInfos.length - 1)
    ) {
      return true;
    }
    return false;
  }

  goToPreviousPage(): void {
    this.merchService.goToPreviousPage();
  }

  goToNextPage(): void {
    this.merchService.goToNextPage();
  }
}
