import { Component, Input, OnChanges } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';
import { Router } from '@angular/router';
import { artistsInfos } from 'src/assets/content/artists-content';

@Component({
  selector: 'artist-navigation',
  templateUrl: './artist-navigation.component.html',
  styleUrls: ['./artist-navigation.component.scss'],
})
export class ArtistNavigationComponent implements OnChanges {
  @Input() artist: ArtistInformations;
  @Input() isMobile: boolean;
  nextArtist: ArtistInformations;
  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.fetchNextArtist();
  }

  fetchNextArtist(): void {
    const indexOfCurrentArtist = artistsInfos.indexOf(this.artist) + 1;

    if (artistsInfos[indexOfCurrentArtist]) {
      this.nextArtist = artistsInfos[indexOfCurrentArtist];
    } else {
      this.nextArtist = artistsInfos[0];
    }
  }

  goBackToArtistsList(): void {
    this.router.navigateByUrl('/artists');
  }

  getNextArtist(): string {
    const urlSegments = this.router.url.split('/');
    if (urlSegments.length > 3) {
      return `../../${encodeURI(this.nextArtist.name)}`;
    }
    return `../${encodeURI(this.nextArtist.name)}`;
  }
}
