import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { ArtistsListPageComponent } from './artists-list-page.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { ArtistBannerComponent } from './artist-page/artist-banner/artist-banner.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [ArtistsListPageComponent, ArtistPageComponent, ArtistBannerComponent],
  exports: [ArtistsListPageComponent, ArtistPageComponent, ArtistBannerComponent],
  providers: [],
})
export class ArtistsModule {}
