import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { MerchPageComponent } from './merch-page.component';
import { MerchBannerComponent } from './merch-banner/merch-banner.component';
import { MerchDescriptionComponent } from './merch-description/merch-description.component';
import { MerchPreviewComponent } from './merch-preview/merch-preview.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [MerchPageComponent, MerchBannerComponent, MerchDescriptionComponent, MerchPreviewComponent],
  exports: [MerchPageComponent, MerchBannerComponent, MerchDescriptionComponent, MerchPreviewComponent],
  providers: [],
})
export class MerchModule {}
