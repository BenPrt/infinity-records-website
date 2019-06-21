import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { MerchPageComponent } from './merch-page.component';
import { MerchBannerComponent } from './merch-banner/merch-banner.component';
import { MerchDescriptionComponent } from './merch-description/merch-description.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [MerchPageComponent, MerchBannerComponent, MerchDescriptionComponent],
  exports: [MerchPageComponent, MerchBannerComponent, MerchDescriptionComponent],
  providers: [],
})
export class MerchModule {}
