import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ArtistInformations } from '../models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeviceService } from '../shared/services/device.service';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list-page.component.html',
  styleUrls: ['./artists-list-page.component.scss'],
})
export class ArtistsListPageComponent implements OnInit {
  artistsInfos: ArtistInformations[] = artistsInfos;
  isBrowser: boolean;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private deviceService: DeviceService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initDeviceType();
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  getArtistPicture(artist: ArtistInformations): string {
    if (this.isBrowser) {
      if (this.isMobile && window.innerWidth < 1300) {
        return artist.cover_picture_mobile !== ''
          ? artist.cover_picture_mobile
          : 'assets/img/artists/default_cover_mobile.jpg';
      }
    }
    return artist.cover_picture !== '' ? artist.cover_picture : 'assets/img/artists/default_cover.jpg';
  }
}
