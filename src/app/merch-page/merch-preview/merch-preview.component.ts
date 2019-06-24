import { Component, OnInit, OnDestroy, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo } from 'src/app/models/merch-info';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'merch-preview',
  templateUrl: './merch-preview.component.html',
  styleUrls: ['./merch-preview.component.scss'],
})
export class MerchPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser: boolean;
  currentProduct: MerchInfo;
  currentIdSubscription: Subscription;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  scrolledAmount: number;
  scrollSubscription: Subscription;
  titleStyle = {};
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private merchService: MerchService,
    private deviceService: DeviceService,
    private scrollService: ScrollService,
    private elRef: ElementRef,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initCurrentProductId();
    this.initDeviceType();
  }

  ngAfterViewInit():void {
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
    if (this.isMobile && this.isBrowser) {
      const containerOffset = this.elRef.nativeElement.offsetTop - 81;
      const thirdPreviewElement = document.getElementById(
        `preview-image-${this.currentProduct.declinations.length - 1}`,
      );
      const thirdPreviewOffset = containerOffset + thirdPreviewElement.offsetTop;
      if (scroll <= containerOffset) {
        this.titleStyle = {
          marginTop: '111px',
        };
      } else if (scroll > containerOffset && scroll <= thirdPreviewOffset) {
        console.log(scroll);
        this.titleStyle = {
          marginTop: `${scroll - containerOffset + 111}px`,
        };
      } else if (scroll > thirdPreviewOffset) {
        this.titleStyle = {
          marginTop: `${thirdPreviewOffset - containerOffset + 111}px`,
        };
      }
    }
  }
}
