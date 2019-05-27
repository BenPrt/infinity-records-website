import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Services Import
import { TranslationService, translationFactoryResources } from './shared/services/translation.service';

// Pages Components Import
import { HomePageComponent } from './home/home-page.component';
import { DownloadPrtapeVol1Component } from './download/download-prtape-vol-1/download-prtape-vol-1.component';
import { DownloadPrtapeVol2Component } from './download/download-prtape-vol-2/download-prtape-vol-2.component';
import { ContactPageComponent } from './contact/contact-page.component';

// Elements Components Import
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { TranslationPipe } from './shared/pipes/translation.pipe';
import { LayoutModule } from './layout/layout.module';
import { MobileMenuComponent } from './shared/mobile-menu/mobile-menu.component';
import { AngularModule } from './angular.module';

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
    ContactFormComponent,
    MobileMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularModule,
    LayoutModule,
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
