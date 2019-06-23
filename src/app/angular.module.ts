import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { TranslationPipe } from './shared/pipes/translation.pipe';

@NgModule({
  declarations: [
    TranslationPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    TranslationPipe,
  ],
})
export class AngularModule {}
