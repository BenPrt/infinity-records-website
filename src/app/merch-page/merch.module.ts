import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { MerchPageComponent } from './merch-page.component';
import { MerchBannerComponent } from './merch-banner/merch-banner.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [MerchPageComponent, MerchBannerComponent],
  exports: [MerchPageComponent, MerchBannerComponent],
  providers: [],
})
export class MerchModule {}
