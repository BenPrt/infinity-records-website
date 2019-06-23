import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { MerchPageComponent } from './merch-page.component';
import { MerchBannerComponent } from './merch-banner/merch-banner.component';
import { MerchDescriptionComponent } from './merch-description/merch-description.component';
import { MerchPreviewComponent } from './merch-preview/merch-preview.component';
import { MerchPreviewImageComponent } from './merch-preview-image/merch-preview-image.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [
    MerchPageComponent,
    MerchBannerComponent,
    MerchDescriptionComponent,
    MerchPreviewComponent,
    MerchPreviewImageComponent,
  ],
  exports: [
    MerchPageComponent,
    MerchBannerComponent,
    MerchDescriptionComponent,
    MerchPreviewComponent,
    MerchPreviewImageComponent,
  ],
  providers: [],
})
export class MerchModule {}
