import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { DownloadPrtapeVol1Component } from './download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download-prtape-vol-2/download-prtape-vol-2.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [DownloadPrtapeVol1Component, DownloadPrtapeVol2Component],
  exports: [DownloadPrtapeVol1Component, DownloadPrtapeVol2Component],
  providers: [],
})
export class DownloadModule {}
