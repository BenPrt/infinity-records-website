import { Component, Input } from '@angular/core';
import { ArtistInformations } from 'src/app/models/artists-info';
import { Router } from '@angular/router';

@Component({
  selector: 'artist-footer',
  templateUrl: './artist-footer.component.html',
  styleUrls: ['./artist-footer.component.scss'],
})
export class ArtistFooterComponent {
  @Input() artist: ArtistInformations;

  constructor(private router : Router) {}

  goBackToArtistsList(): void {
    this.router.navigateByUrl('/artists');
  }
}
