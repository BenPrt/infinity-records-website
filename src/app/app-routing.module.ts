import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';

import { LabelPageComponent } from './label-page/label-page.component';

import { ArtistsListPageComponent } from './artists-page/artists-list-page.component';
import { ArtistPageComponent } from './artists-page/artist-page/artist-page.component';

import { MerchPageComponent } from './merch-page/merch-page.component';

import { DownloadPrtapeVol1Component } from './download-pages/download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download-pages/download-prtape-vol-2/download-prtape-vol-2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
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
  {
    path: 'download-prtape-vol-1',
    component: DownloadPrtapeVol1Component,
  },
  {
    path: 'download-prtape-vol-2',
    component: DownloadPrtapeVol2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
