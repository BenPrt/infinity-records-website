import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { DeviceService } from 'src/app/shared/services/device.service';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  isMobile: boolean;
  deviceTypeSubscription: Subscription;

  constructor(
    private deviceService: DeviceService,
    private meta: Meta,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.initDeviceType();
    this.defineMetadata();
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.updateTag({
      name: 'title',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_TITLE')}`,
    });
    this.meta.updateTag({
      name: 'description',
      content: `${translationPipe.transform('METADATA_HOMEPAGE_DESCRIPTION')}`,
    });
    this.meta.updateTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_HOMEPAGE_KEYWORDS')}` });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }
}
