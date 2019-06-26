import { Component, Input, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { StaffInfo } from 'src/app/models/staff-info';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeviceService } from 'src/app/shared/services/device.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'label-staff-card',
  templateUrl: './label-staff-card.component.html',
  styleUrls: ['./label-staff-card.component.scss'],
  host: {
    '(window:click)': 'displayQuote($event, false)',
  },
  animations: [
    trigger('quote-fade', [
      transition(':enter', [style({ opacity: 0 }), animate('200ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LabelStaffCardComponent {
  @Input() member: StaffInfo;
  isBrowser: boolean;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  quoteIsDisplayed: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private elRef: ElementRef,
    private deviceService: DeviceService,
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

  displayQuote(event: MouseEvent, displayValue?: boolean): void {
    if (this.isBrowser) {
      if (this.isMobile) {
        if (
          document.getElementById('member-picture-wrapper').contains(event.target as Node) ||
          document.getElementById('member-name').contains(event.target as Node)
        ) {
          this.quoteIsDisplayed = true;
        } else {
          this.quoteIsDisplayed = false;
        }
      } else {
        if (event.type !== 'click') {
          if (displayValue !== undefined) {
            this.quoteIsDisplayed = displayValue;
          }
        }
      }
    }
  }
}
