import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { ArtistsPageComponent } from './artists-page.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [ArtistsPageComponent],
  exports: [ArtistsPageComponent],
  providers: [],
})
export class ArtistsModule {}
