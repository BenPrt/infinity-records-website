import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { MerchPageComponent } from './merch-page.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [MerchPageComponent],
  exports: [MerchPageComponent],
  providers: [],
})
export class MerchModule {}
