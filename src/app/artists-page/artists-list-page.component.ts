import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ArtistInformations } from 'src/app/models/artists-info';
import { artistsInfos } from 'src/assets/content/artists-content';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/shared/services/device.service';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private deviceService: DeviceService,
    private meta: Meta,
    private translationService: TranslationService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initDeviceType();
    this.defineMetadata();
  }

  initDeviceType(): void {
    this.isMobile = this.deviceService.getIsMobile();
    this.deviceTypeSubscription = this.deviceService.deviceIsMobileHasChanged.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.updateTag({
      name: 'title',
      content: `${translationPipe.transform('METADATA_ARTISTS_LIST_TITLE')}`,
    });
    this.meta.updateTag({
      name: 'description',
      content: `${translationPipe.transform('METADATA_ARTISTS_LIST_DESCRIPTION')}`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `${translationPipe.transform('METADATA_ARTISTS_LIST_KEYWORDS')}`,
    });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:url',
      content: 'https://infinity-records.fr/artists',
    });
    this.meta.updateTag({ prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:title',
      content: `${translationPipe.transform('METADATA_ARTISTS_LIST_TITLE')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:description',
      content: `${translationPipe.transform('METADATA_ARTISTS_LIST_DESCRIPTION')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:image',
      content: 'https://infinity-records.fr/assets/img/label/banner.jpg',
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
