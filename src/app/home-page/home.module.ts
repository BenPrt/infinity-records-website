import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  providers: [],
})
export class HomeModule {}
