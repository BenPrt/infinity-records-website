import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo } from 'src/app/models/merch-info';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'merch-description',
  templateUrl: './merch-description.component.html',
  styleUrls: ['./merch-description.component.scss'],
  animations: [
    trigger('indicatorAnimation', [
      state(
        'true',
        style({
          opacity: '1',
          fontWeight: 'bold',
          borderBottom: '2px solid black',
        }),
      ),
      state(
        'false',
        style({
          opacity: '0.39',
          fontWeight: 'initial',
          borderBottom: '2px solid #F5F5F5',
        }),
      ),
      transition('true <=> false', [animate('300ms')]),
    ]),
  ],
})
export class MerchDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: string = 'initial';
  isBrowser: boolean;
  currentProduct: MerchInfo;
  currentIdSubscription: Subscription;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  allProducts: MerchInfo[] = merchInfos;
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
      if (this.isBrowser) {
        this.loading = currentId > this.currentProduct.id ? 'loading-next' : 'loading-previous';
        setTimeout(() => {
          this.currentProduct = merchInfos[currentId];
          this.loading = this.loading === 'loading-next' ? 'loaded-next' : 'loaded-previous';
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

  initcontainerHeight(): void {
    if (this.isBrowser && this.isMobile) {
      document.getElementById('description-first-layer').style.height = `${
        document.getElementById('description-second-layer').offsetHeight
      }px`;
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
    if (id !== this.currentProduct.id) {
      this.merchService.setCurrentPageId(id);
    }
  }

  scrollToPreview(): void {
    if (this.isBrowser) {
      const previewElement = document.getElementById('preview-first-layer');
      const previewElementDesktopOffset = previewElement.offsetTop - 116;
      const previewElementMobileOffset = previewElement.offsetTop - 81;
      if (this.isMobile) {
        document.getElementById('mobile-page-content').scrollTo(0, previewElementMobileOffset);
      } else {
        window.scrollTo(0, previewElementDesktopOffset);
      }
    }
  }
}
