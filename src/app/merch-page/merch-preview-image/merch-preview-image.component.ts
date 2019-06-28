import { Component, OnInit, OnDestroy, Input, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo, MerchDeclination } from 'src/app/models/merch-info';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'merch-preview-image',
  templateUrl: './merch-preview-image.component.html',
  styleUrls: ['./merch-preview-image.component.scss'],
  host: {
    '(document:touchend)': 'displayDetails($event, false)',
    '(window:click)': 'displayDetails($event, false)',
  },
  animations: [
    trigger('details-fade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MerchPreviewImageComponent implements OnInit, OnDestroy {
  @Input() declination: MerchDeclination;
  @Input() currentProduct: MerchInfo;
  isBrowser: boolean;
  detailsAreDisplayed: boolean;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef,
    private deviceService: DeviceService,
    private translationService: TranslationService,
  ) {
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

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }

  displayDetails(event: MouseEvent, displayValue?: boolean): void {
    if (this.isBrowser) {
      if (this.isMobile) {
        if (event.target === this.elRef.nativeElement || this.elRef.nativeElement.contains(event.target as Node)) {
          this.detailsAreDisplayed = true;
        } else {
          this.detailsAreDisplayed = false;
        }
      } else {
        if (event.type !== 'click') {
          if (displayValue !== undefined) {
            this.detailsAreDisplayed = displayValue;
          }
        }
      }
    }
  }

  getProductTitle(): string {
    const translationPipe = new TranslationPipe(this.translationService);
    const translatedTitle = translationPipe.transform(this.currentProduct.title);
    return translatedTitle.substring(0, translatedTitle.length - 1);
  }
}
