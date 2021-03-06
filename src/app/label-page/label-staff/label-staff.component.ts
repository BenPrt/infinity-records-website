import { Component, AfterViewInit, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';
import { isPlatformBrowser } from '@angular/common';
import { staffInfos } from 'src/assets/content/label-staff-content';
import { StaffInfo } from 'src/app/models/staff-info';

@Component({
  selector: 'label-staff',
  templateUrl: './label-staff.component.html',
  styleUrls: ['./label-staff.component.scss'],
})
export class LabelStaffComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser: boolean;
  isMobile: boolean;
  staffMembers: StaffInfo[] = staffInfos;
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
      if (!this.isMobile) {
        const secondLayerHeight = document.getElementById('staff-second-layer').offsetHeight;
        document.getElementById('staff-first-layer').style.height = `${secondLayerHeight}px`;
      } else {
        const cardWrapper = document.getElementById('staff-cards-wrapper');
        cardWrapper.style.marginTop = `-${cardWrapper.offsetHeight + 72}px`;
        const secondLayer = document.getElementById('staff-second-layer');
        secondLayer.style.height = `${40 + 24 + cardWrapper.offsetHeight}px`;
        document.getElementById('staff-first-layer').style.height = `${secondLayer.offsetHeight}px`;
      }
    }
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }
}
