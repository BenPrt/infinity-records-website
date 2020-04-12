import { Component, Input, Inject, PLATFORM_ID, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'facebook-feed',
  templateUrl: './facebook-feed.component.html',
  styleUrls: ['./facebook-feed.component.scss'],
})
export class FacebookFeedComponent implements OnInit {
  @Input() width: string;
  @Input() height: string;
  isBrowser: boolean;
  finalSrc: SafeResourceUrl;
  finalWidth: string;
  finalHeight: string;

  url: string =
    // tslint:disable-next-line:max-line-length
    'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Finfinity.recxrds&tabs=timeline%2C%20events&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=474293569659442';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private elRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.parseUrl();
  }

  parseUrl(): void {
    const splittedUrl: string[] = this.url.split('&');

    let parsedUrl = '';
    splittedUrl.forEach((urlPart: string) => {
      let updateableUrlPart: string;
      if (urlPart.indexOf('width') !== -1 && urlPart.indexOf('adapt_container_width') === -1) {
        updateableUrlPart = urlPart.substring(0, 5);
        updateableUrlPart = updateableUrlPart.concat(`=${this.getWidth()}`);
      } else if (urlPart.indexOf('height') !== -1) {
        updateableUrlPart = urlPart.substring(0, 6);
        updateableUrlPart = updateableUrlPart.concat(`=${this.getHeight()}`);
      } else {
        updateableUrlPart = urlPart;
      }
      parsedUrl = parsedUrl !== '' ? `${parsedUrl}&${updateableUrlPart}` : `${updateableUrlPart}`;
    });

    this.finalSrc = this.sanitizer.bypassSecurityTrustResourceUrl(parsedUrl);
  }

  getWidth(): string {
    let pixelWidth: number;
    if (this.width.substring(this.width.length - 2, this.width.length) === 'vw') {
      if (this.isBrowser) {
        const relativeWidth = parseInt(this.width.substring(0, this.width.length - 2), 10);
        pixelWidth = Math.round((document.body.clientWidth * relativeWidth) / 100);
      } else {
        pixelWidth = 500;
      }
    } else {
      pixelWidth = parseInt(this.width, 10);
    }
    if (pixelWidth > 500) {
      this.finalWidth = '500';
    } else {
      this.finalWidth = String(pixelWidth);
    }

    this.renderer.setStyle(this.elRef.nativeElement, 'width', `${this.finalWidth}px`);
    this.renderer.setStyle(this.elRef.nativeElement, 'margin', `0 calc((100% - ${this.finalWidth}px) / 2)`);

    return this.finalWidth;
  }

  getHeight(): string {
    let pixelHeight: number;
    if (this.height.substring(this.height.length - 2, this.height.length) === 'vw') {
      if (this.isBrowser) {
        const relativeHeight = parseInt(this.height.substring(0, this.height.length - 2), 10);
        pixelHeight = (document.body.clientWidth * relativeHeight) / 100;
      } else {
        pixelHeight = 500;
      }
    } else {
      pixelHeight = parseInt(this.height, 10);
    }

    this.finalHeight = String(Math.round(pixelHeight));

    return this.finalHeight;
  }
}
