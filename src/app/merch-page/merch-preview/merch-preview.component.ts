import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo } from 'src/app/models/merch-info';
import { ScrollService } from 'src/app/shared/services/scroll.service';

@Component({
  selector: 'merch-preview',
  templateUrl: './merch-preview.component.html',
  styleUrls: ['./merch-preview.component.scss'],
})
export class MerchPreviewComponent implements OnInit, OnDestroy {
  currentProduct: MerchInfo;
  currentIdSubscription: Subscription;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  scrolledAmount: number;
  scrollSubscription: Subscription;
  titleStyle = {};
  constructor(
    private merchService: MerchService,
    private deviceService: DeviceService,
    private scrollService: ScrollService,
    private elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.initCurrentProductId();
    this.initDeviceType();
    this.initScrollSubscription();
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

  initScrollSubscription() {
    this.scrollSubscription = this.scrollService.scrollHappened.subscribe((amount: number) => {
      this.scrolledAmount = amount;
      this.manageTitlePositioning(this.scrolledAmount);
    });
  }

  ngOnDestroy(): void {
    this.currentIdSubscription.unsubscribe();
    this.deviceTypeSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
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

  manageTitlePositioning(scroll: number): void {
    if (this.isMobile) {
      if (scroll <= 1366) {
        this.titleStyle = {
          marginTop: '111px',
        };
      } else if (scroll > 1366 && scroll <= 1922) {
        this.titleStyle = {
          marginTop: `${scroll - 1366 + 111}px`,
        };
      } else if (scroll > 1922) {
        this.titleStyle = {
          marginTop: `${1922 - 1366 + 111}px`,
        };
      }
    }
  }
}
