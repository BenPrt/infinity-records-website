import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-news-feed',
  templateUrl: './home-news-feed.component.html',
  styleUrls: ['./home-news-feed.component.scss'],
})
export class HomeNewsFeedComponent {
  @Input() isMobile: boolean;
  constructor() {}
}
