import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HomePageComponent } from './home/home-page.component';
import { ContactPageComponent } from './contact/contact-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { HeaderLogoComponent } from './shared/header/header-logo/header-logo.component';
import { HeaderDesktopMenuComponent } from './shared/header/header-desktop-menu/header-desktop-menu.component';
import { HeaderMobileMenuIconComponent } from './shared/header/header-mobile-menu-icon/header-mobile-menu-icon.component';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';
import { AppRoutingModule } from './app-routing.module';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { velocity: 0.4, threshold: 20 }, // override default settings
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    HeaderComponent,
    HeaderLogoComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuIconComponent,
    MobileMenuComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
