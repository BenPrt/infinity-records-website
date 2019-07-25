import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistInformations, TrackInformations } from 'src/app/models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';
import { ArtistsProjectsService } from 'src/app/shared/services/artists-projects.service';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
})
export class ArtistPageComponent implements OnInit {
  isBrowser: boolean;
  loading: string = 'initial';
  artist: ArtistInformations;
  currentProjectId: number;
  playingTrack: TrackInformations;
  isMobile: boolean;
  deviceTypeSubscription: Subscription;
  currentProjectIdSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router,
    private artistsService: ArtistsProjectsService,
    private meta: Meta,
    private translationService: TranslationService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initDeviceType();
    this.initCurrentArtist();
    this.defineMetadata();
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
    this.currentProjectId = projectId;
    this.artistsService.setCurrentProjectId(this.currentProjectId);
    this.currentProjectIdSubscription = this.artistsService.currentProjectIdHasChanged.subscribe(
      (currentId: number) => {
        if (this.isBrowser) {
          console.log(this.loading);
          this.loading = currentId > this.currentProjectId ? 'loading-next' : 'loading-previous';
          setTimeout(() => {
            this.currentProjectId = currentId;
            this.loading = this.loading === 'loading-next' ? 'loaded-next' : 'loaded-previous';
          }, 300);
        } else {
          this.currentProjectId = currentId;
        }
      },
    );
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.addTag({ name: 'description', content: `${translationPipe.transform('METADATA_ARTISTS_DESCRIPTION')}` });
    this.meta.addTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_ARTISTS_KEYWORDS')}` });
    this.meta.addTag({ name: 'author', content: 'Infinity Records' });
  }

  ngOnDestroy(): void {
    this.deviceTypeSubscription.unsubscribe();
    if (this.currentProjectIdSubscription) {
      this.currentProjectIdSubscription.unsubscribe();
    }
  }

  playTrack(track: TrackInformations): void {
    this.playingTrack = track;
  }
}
