import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';

import { TranslationPipe } from './shared/pipes/translation.pipe';
import { LocaleDatePipe } from './shared/pipes/localeDate.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TranslationPipe,
    LocaleDatePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    RouterModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset,
    }),
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    TranslationPipe,
    LocaleDatePipe,
    RouterModule,
    LazyLoadImageModule,
  ],
})
export class AngularModule {}
