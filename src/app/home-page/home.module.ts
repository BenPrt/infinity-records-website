import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularModule } from 'src/app/angular.module';

import { HomePageComponent } from './home-page.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeNewsFeedComponent } from './home-news-feed/home-news-feed.component';
import { FacebookFeedComponent } from './facebook-feed/facebook-feed.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [HomePageComponent, HomeBannerComponent, HomeNewsFeedComponent, FacebookFeedComponent],
  exports: [HomePageComponent, HomeBannerComponent, HomeNewsFeedComponent, FacebookFeedComponent],
  providers: [],
})
export class HomeModule {}
