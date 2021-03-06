import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { HomePageComponent } from './home-page.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeNewsFeedComponent } from './home-news-feed/home-news-feed.component';
import { FacebookFeedComponent } from './facebook-feed/facebook-feed.component';
import { HomeLinkingComponent } from './home-linking/home-linking.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [
    HomePageComponent,
    HomeBannerComponent,
    HomeNewsFeedComponent,
    FacebookFeedComponent,
    HomeLinkingComponent,
  ],
  exports: [HomePageComponent, HomeBannerComponent, HomeNewsFeedComponent, FacebookFeedComponent, HomeLinkingComponent],
  providers: [],
})
export class HomeModule {}
