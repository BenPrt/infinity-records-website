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
  loading: boolean;
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

  ngAfterViewInit(): void {
    this.initScrollSubscription();
  }

  initCurrentProductId(): void {
    this.currentProduct = merchInfos[this.merchService.getCurrentPageId()];
    this.currentIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId: number) => {
      if (this.isBrowser) {
        this.loading = true;
        setTimeout(() => {
          this.currentProduct = merchInfos[currentId];
          this.loading = false;
        }, 300);
      } else {
        this.currentProduct = merchInfos[currentId];
      }
    });
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  initScrollSubscription(): void {
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
    if (this.currentProduct.id > 0) {
      this.merchService.goToPreviousPage();
    }
  }

  goToNextPage(): void {
    if (this.currentProduct.id < merchInfos.length - 1) {
      this.merchService.goToNextPage();
    }
  }

  manageTitlePositioning(scroll: number): void {
    if (this.isBrowser) {
      if (this.isMobile && document.querySelector('body').offsetWidth < 1300) {
        const containerOffset = this.elRef.nativeElement.offsetTop - (21.54 / 100) * document.body.clientWidth;
        const thirdPreviewElement = document.getElementById(
          `preview-image-${this.currentProduct.declinations.length - 1}`,
        );
        const thirdPreviewOffset = containerOffset + thirdPreviewElement.offsetTop;
        if (scroll <= containerOffset) {
          this.titleStyle = {
            position: 'absolute',
            top: 'initial',
            marginTop: '29.52vw',
          };
        } else if (scroll > containerOffset && scroll <= thirdPreviewOffset) {
          this.titleStyle = {
            position: 'fixed',
            top: 'calc(29.52vw + 21.28vw)',
            marginTop: 0,
          };
        } else if (scroll > thirdPreviewOffset) {
          this.titleStyle = {
            position: 'absolute',
            top: 'initial',
            marginTop: `calc(${thirdPreviewOffset - containerOffset}px + 29.52vw)`,
          };
        }
      }
    }
  }
}
