import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistInformations } from 'src/app/models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
})
export class ArtistPageComponent implements OnInit {
  artist: ArtistInformations;
  currentProject: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initCurrentArtist();
  }

  initCurrentArtist(): void {
    this.route.params.subscribe((params) => {
      const artistName = decodeURI(params.artist);
      this.artist = artistsInfos.find((artist: ArtistInformations) => {
        return artist.name === artistName;
      });
      if (params.project) {
        this.initCurrentProject(parseInt(params.project, 10));
      }
    });
  }

  initCurrentProject(projectId: number): void {
    console.log(`Current Project : ${projectId}`);
  }
}
