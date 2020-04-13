import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { velocity: 0.4, threshold: 20 }, // override default settings
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HammerModule,
    BrowserAnimationsModule,

    AngularModule,
    LayoutModule,
    HomeModule,
    LabelModule,
    ArtistsModule,
    MerchModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: LOCALE_ID,
      deps: [TranslationService],
      useFactory: (translationService: TranslationService) => translationService.getCurrentLanguage(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
