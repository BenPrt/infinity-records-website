import { Component } from '@angular/core';
import { ArtistInformations } from '../models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list-page.component.html',
  styleUrls: ['./artists-list-page.component.scss'],
})
export class ArtistsListPageComponent {
  artistsInfos: ArtistInformations[] = artistsInfos;
  constructor(private router: Router) {}

  goToArtist(artist: ArtistInformations): void {
    this.router.navigateByUrl(`/artists/${encodeURI(artist.name)}`);
  }
}
