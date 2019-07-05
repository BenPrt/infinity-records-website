import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { ArtistsListPageComponent } from './artists-list-page.component';
import { ArtistPageComponent } from './artist-page/artist-page.component';
import { ArtistBannerComponent } from './artist-page/artist-banner/artist-banner.component';
import { ArtistNavigationComponent } from './artist-page/artist-navigation/artist-navigation.component';
import { ArtistProjectsComponent } from './artist-page/artist-projects/artist-projects.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [
    ArtistsListPageComponent,
    ArtistPageComponent,
    ArtistBannerComponent,
    ArtistNavigationComponent,
    ArtistProjectsComponent,
  ],
  exports: [
    ArtistsListPageComponent,
    ArtistPageComponent,
    ArtistBannerComponent,
    ArtistNavigationComponent,
    ArtistProjectsComponent,
  ],
  providers: [],
})
export class ArtistsModule {}
