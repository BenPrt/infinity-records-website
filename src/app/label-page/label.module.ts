import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { LabelPageComponent } from './label-page.component';
import { LabelBannerComponent } from './label-banner/label-banner.component';
import { LabelDescriptionComponent } from './label-description/label-description.component';
import { LabelStaffComponent } from './label-staff/label-staff.component';
import { LabelStaffCardComponent } from './label-staff-card/label-staff-card.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [
    LabelPageComponent,
    LabelBannerComponent,
    LabelDescriptionComponent,
    LabelStaffComponent,
    LabelStaffCardComponent,
  ],
  exports: [
    LabelPageComponent,
    LabelBannerComponent,
    LabelDescriptionComponent,
    LabelStaffComponent,
    LabelStaffCardComponent,
  ],
  providers: [],
})
export class LabelModule {}
