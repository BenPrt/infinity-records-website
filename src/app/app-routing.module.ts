import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { LabelPageComponent } from './label-page/label-page.component';

import { ArtistsListPageComponent } from './artists-page/artists-list-page.component';
import { ArtistPageComponent } from './artists-page/artist-page/artist-page.component';

import { MerchPageComponent } from './merch-page/merch-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'label',
    component: LabelPageComponent,
  },
  {
    path: 'artists',
    component: ArtistsListPageComponent,
  },
  {
    path: 'artists/:artist',
    component: ArtistPageComponent,
  },
  {
    path: 'artists/:artist/:project',
    component: ArtistPageComponent,
  },
  {
    path: 'merch',
    component: MerchPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
