import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo } from 'src/app/models/merch-info';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'merch-description',
  templateUrl: './merch-description.component.html',
  styleUrls: ['./merch-description.component.scss'],
})
export class MerchDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser: boolean;
  currentProduct: MerchInfo;
  currentIdSubscription: Subscription;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private merchService: MerchService,
    private deviceService: DeviceService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initCurrentProductId();
    this.initDeviceType();
  }

  ngAfterViewInit(): void {
    this.initcontainerHeight();
  }

  initCurrentProductId(): void {
    this.currentProduct = merchInfos[this.merchService.getCurrentPageId()];
    this.currentIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId: number) => {
      this.currentProduct = merchInfos[currentId];
    });
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  initcontainerHeight(): void {
    if (this.isBrowser && this.isMobile) {
      document.getElementById('first-layer').style.height = `${document.getElementById('second-layer').offsetHeight}px`;
    }
  }

  ngOnDestroy(): void {
    this.currentIdSubscription.unsubscribe();
    this.deviceTypeSubscription.unsubscribe();
  }

  isDisabled(direction: string): boolean {
    if (
      (direction === 'previous' && this.currentProduct.id === 0) ||
      (direction === 'next' && this.currentProduct.id === merchInfos.length - 1)
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

  isCurrentProduct(id: number): boolean {
    if (this.currentProduct.id === id) {
      return true;
    }
    return false;
  }

  goToProduct(id: number): void {
    this.merchService.setCurrentPageId(id);
  }

  scrollToPreview(): void {
    if (this.isBrowser) {
      if (this.isMobile) {
        document.getElementById('mobile-page-content').scrollTo(0, 1366);
      } else {
        window.scrollTo(0, 1590);
      }
    }
  }
}
