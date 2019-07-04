import { Component, Input } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';

@Component({
  selector: 'artist-banner',
  templateUrl: './artist-banner.component.html',
  styleUrls: ['./artist-banner.component.scss'],
})
export class ArtistBannerComponent {
  @Input() artist: ArtistInformations;

  constructor() {}
}
