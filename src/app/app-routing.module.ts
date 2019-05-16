import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home/home-page.component';
import { DownloadPrtapeVol1Component } from './download/download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download/download-prtape-vol-2/download-prtape-vol-2.component';

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
