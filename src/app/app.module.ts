import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Pages Components Import
import { HomePageComponent } from './home/home-page.component';
import { DownloadPrtapeVol1Component } from './download/download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download/download-prtape-vol-2/download-prtape-vol-2.component';
import { ContactPageComponent } from './contact/contact-page.component';

// Elements Components Import
import { HeaderComponent } from './shared/header/header.component';
import { HeaderLogoComponent } from './shared/header/header-logo/header-logo.component';
import { HeaderDesktopMenuComponent } from './shared/header/header-desktop-menu/header-desktop-menu.component';
import { HeaderMobileMenuIconComponent } from './shared/header/header-mobile-menu-icon/header-mobile-menu-icon.component';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { velocity: 0.4, threshold: 20 }, // override default settings
  };
}

@NgModule({
  declarations: [
    AppComponent,
    // Pages Components
    HomePageComponent,
    ContactPageComponent,
    DownloadPrtapeVol1Component,
    DownloadPrtapeVol2Component,
    // Elements Components
    HeaderComponent,
    HeaderLogoComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuIconComponent,
    MobileMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
