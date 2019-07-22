import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { HomePageComponent } from './home-page.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [HomePageComponent, HomeBannerComponent],
  exports: [HomePageComponent, HomeBannerComponent],
  providers: [],
})
export class HomeModule {}
