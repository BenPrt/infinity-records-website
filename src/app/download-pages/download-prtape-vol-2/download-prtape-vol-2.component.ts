import { Component } from '@angular/core';

@Component({
  selector: 'download-prtape-vol-2',
  templateUrl: './download-prtape-vol-2.component.html',
  styleUrls: ['./download-prtape-vol-2.component.scss'],
  animations: [],
})
export class DownloadPrtapeVol2Component {
  constructor() {}

  download(path: string): void {
    window.open(path, '_blank');
  }
}
