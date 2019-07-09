import { Component, Input } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';

@Component({
  selector: 'artist-footer',
  templateUrl: './artist-footer.component.html',
  styleUrls: ['./artist-footer.component.scss'],
})
export class ArtistFooterComponent {
  @Input() artist: ArtistInformations;

  constructor() {}
}
