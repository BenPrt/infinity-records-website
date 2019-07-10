import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistInformations } from 'src/app/models/artists-info';
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
  isMobile: boolean;
  deviceTypeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private deviceService: DeviceService) {}

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
      const artistName = decodeURI(params.artist);
      this.artist = artistsInfos.find((artist: ArtistInformations) => {
        return artist.name === artistName;
      });
      if (params.project) {
        this.initCurrentProject(parseInt(params.project, 10));
      } else {
        this.initCurrentProject(1);
      }
    });
  }

  initCurrentProject(projectId: number): void {
    this.currentProjectId = projectId;
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
  }
}
