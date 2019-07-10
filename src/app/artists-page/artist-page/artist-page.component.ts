import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistInformations, TrackInformations } from 'src/app/models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
})
export class ArtistPageComponent implements OnInit {
  artist: ArtistInformations;
  currentProjectId: number;
  playingTrack: TrackInformations;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private deviceService: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.initDeviceType();
    this.initCurrentArtist();
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  initCurrentArtist(): void {
    this.route.params.subscribe((params) => {
      this.playingTrack = undefined;
      this.currentProjectId = undefined;
      const artistName = decodeURI(params.artist);
      this.artist = artistsInfos.find((artist: ArtistInformations) => {
        return artist.name === artistName;
      });
      if (this.artist) {
        if (params.project) {
          this.initCurrentProject(parseInt(params.project, 10));
        } else {
          this.initCurrentProject(1);
        }
      } else {
        this.router.navigateByUrl('/artists');
      }
    });
  }

  initCurrentProject(projectId: number): void {
    console.log(projectId);
    this.currentProjectId = projectId;
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }

  playTrack(track: TrackInformations): void {
    this.playingTrack = track;
  }
}
