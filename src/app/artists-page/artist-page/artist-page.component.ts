import { Component, OnInit, Inject, PLATFORM_ID, AfterViewChecked } from '@angular/core';
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
export class ArtistPageComponent implements OnInit, AfterViewChecked {
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

  ngAfterViewChecked(): void {
    this.defineBannerInsideLayerHeight();
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
      this.defineMetadata();
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

  defineBannerInsideLayerHeight(): void {
    if (this.isBrowser && this.isMobile) {
      this.route.params.subscribe((params) => {
        const descriptionHeight = document.getElementById('artist-description-wrapper').offsetHeight;
        document.getElementById(
          'artist-first-inside-layer',
        ).style.height = `calc(19.68vw + 17.29vw + 91.49vw + 12.77vw + ${descriptionHeight}px + 17.02vw)`;
        document.getElementById(
          'artist-second-layer',
        ).style.marginTop = `calc(-19.68vw - 17.29vw - 91.49vw - 12.77vw - ${descriptionHeight}px - 17.02vw)`;
        document.getElementById(
          'artist-second-layer',
        ).style.marginBottom = `calc(12.77vw + ${descriptionHeight}px + 17.02vw)`;
        document.getElementById(
          'artist-cover',
        ).style.marginTop = `calc(-17.29vw - 91.49vw - 12.77vw - ${descriptionHeight}px - 17.02vw)`;
        document.getElementById(
          'artist-navigation',
        ).style.marginTop = `calc(-19.68vw - 17.29vw - 91.49vw - 12.77vw - ${descriptionHeight}px - 17.02vw + 4.26vw)`;
      });
    }
  }

  initCurrentProject(projectId: number): void {
    this.currentProjectId = projectId;
    this.artistsService.setCurrentProjectId(this.currentProjectId);
    this.currentProjectIdSubscription = this.artistsService.currentProjectIdHasChanged.subscribe(
      (currentId: number) => {
        if (this.isBrowser) {
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
    this.meta.updateTag({
      name: 'title',
      content: `Infinity Records - ${this.artist.name}`,
    });
    this.meta.updateTag({
      name: 'description',
      content: `${translationPipe.transform(this.artist.metadata_description)}`,
    });
    this.meta.updateTag({ name: 'keywords', content: `${translationPipe.transform(this.artist.metadata_keywords)}` });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:url',
      content: `https://infinity-records.fr/artists/${encodeURI(this.artist.name)}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:type',
      content: 'website',
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:title',
      content: `Infinity Records - ${this.artist.name}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:description',
      content: `${translationPipe.transform(this.artist.metadata_description)}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:image',
      content: `https://infinity-records.fr/${this.artist.cover_picture}`,
    });
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
