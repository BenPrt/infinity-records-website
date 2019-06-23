import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';
import { MerchInfo, MerchDeclination } from 'src/app/models/merch-info';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'merch-preview-image',
  templateUrl: './merch-preview-image.component.html',
  styleUrls: ['./merch-preview-image.component.scss'],
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
  detailsAreDisplayed: boolean;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  constructor(private deviceService: DeviceService, private translationService: TranslationService) {}

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

  displayDetails(displayValue: boolean): void {
    this.detailsAreDisplayed = displayValue;
  }

  getProductTitle(): string {
    const translationPipe = new TranslationPipe(this.translationService);
    const translatedTitle = translationPipe.transform(this.currentProduct.title);
    return translatedTitle.substring(0, translatedTitle.length - 1);
  }
}
