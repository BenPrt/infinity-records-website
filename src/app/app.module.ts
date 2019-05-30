import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Translation service Import
import { TranslationService, translationFactoryResources } from './shared/services/translation.service';

// Modules Import
import { AngularModule } from './angular.module';
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home-page/home.module';
import { LabelModule } from './label-page/label.module';
import { ArtistsModule } from './artists-page/artists.module';
import { MerchModule } from './merch-page/merch.module';
import { DownloadModule } from './download-pages/download.module';

// Elements Components Import
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ContactPageComponent } from './contact/contact-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { velocity: 0.4, threshold: 20 }, // override default settings
  };
}

@NgModule({
  declarations: [
    AppComponent,
    // Elements Components
    ContactFormComponent,
    ContactPageComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularModule,
    BrowserAnimationsModule,
    LayoutModule,
    HomeModule,
    LabelModule,
    ArtistsModule,
    MerchModule,
    DownloadModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: translationFactoryResources,
      deps: [TranslationService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
