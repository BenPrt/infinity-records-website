import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { LabelPageComponent } from './label-page.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [LabelPageComponent],
  exports: [LabelPageComponent],
  providers: [],
})
export class LabelModule {}
