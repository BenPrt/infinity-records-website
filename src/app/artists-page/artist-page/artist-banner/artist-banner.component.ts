import { Component, Input } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';
import { Router } from '@angular/router';

@Component({
  selector: 'artist-banner',
  templateUrl: './artist-banner.component.html',
  styleUrls: ['./artist-banner.component.scss'],
})
export class ArtistBannerComponent {
  @Input() artist: ArtistInformations;

  constructor(private router: Router) {}

  navigateTo(url: string) {
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
