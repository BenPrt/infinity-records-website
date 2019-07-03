import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { ArtistsPageComponent } from './artists-page.component';
import { PRTCrewPageComponent } from './prt-crew-page/prt-crew-page.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [ArtistsPageComponent, PRTCrewPageComponent],
  exports: [ArtistsPageComponent, PRTCrewPageComponent],
  providers: [],
})
export class ArtistsModule {}
