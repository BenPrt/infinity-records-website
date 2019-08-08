import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'artist-banner',
  templateUrl: './artist-banner.component.html',
  styleUrls: ['./artist-banner.component.scss'],
})
export class ArtistBannerComponent {
  @Input() artist: ArtistInformations;
  @Input() isMobile: boolean;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  getArtistCoverPicture(): string {
    if (this.isBrowser) {
      if (this.isMobile && window.innerWidth < 1300) {
        return this.artist.cover_picture_mobile !== ''
          ? this.artist.cover_picture_mobile
          : 'assets/img/artists/default_cover_mobile.jpg';
      }
    }
    return this.artist.cover_picture !== '' ? this.artist.cover_picture : 'assets/img/artists/default_cover.jpg';
  }

}
