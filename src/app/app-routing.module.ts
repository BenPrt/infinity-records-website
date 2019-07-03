import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LabelPageComponent } from './label-page/label-page.component';
import { ArtistsPageComponent } from './artists-page/artists-page.component';
import { MerchPageComponent } from './merch-page/merch-page.component';
import { DownloadPrtapeVol1Component } from './download-pages/download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download-pages/download-prtape-vol-2/download-prtape-vol-2.component';
import { PRTCrewPageComponent } from './artists-page/prt-crew-page/prt-crew-page.component';

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
    component: ArtistsPageComponent,
  },
  {
    path: 'artists/prt-crew',
    component: PRTCrewPageComponent,
  },
  {
    path: 'artists/prt-crew/:project',
    component: PRTCrewPageComponent,
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
