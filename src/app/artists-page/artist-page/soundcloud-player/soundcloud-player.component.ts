import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'soundcloud-player',
  templateUrl: './soundcloud-player.component.html',
  styleUrls: ['./soundcloud-player.component.scss'],
})
export class SoundcloudPlayerComponent implements OnChanges {
  @Input() trackUrl: string;
  @Input() autoplay: boolean;
  soundcloudUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.initUrl();
  }

  initUrl(): void {
    const splittedUrl: string[] = this.trackUrl.split('&');

    let parsedUrl = '';
    splittedUrl.forEach((urlPart: string) => {
      if (urlPart.indexOf('auto_play') !== -1) {
        let updateableUrlPart = String(urlPart);
        updateableUrlPart = updateableUrlPart.substring(0, 9);
        updateableUrlPart = updateableUrlPart.concat(`=${String(this.autoplay)}`);
      }
      if (urlPart.indexOf('color') !== -1) {
        let updateableUrlPart = String(urlPart);
        console.log(updateableUrlPart);
        updateableUrlPart = urlPart.substring(0, 5);
        console.log(updateableUrlPart);
        updateableUrlPart = updateableUrlPart.concat('=%23d7bf85');
        console.log(updateableUrlPart);
      }

      parsedUrl = parsedUrl !== '' ? `${parsedUrl}&${urlPart}` : `${urlPart}`;
    });

    this.soundcloudUrl = this.sanitizer.bypassSecurityTrustResourceUrl(parsedUrl);
  }
}
