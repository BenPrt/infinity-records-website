import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HeaderTopSettingsComponent } from './header/header-top-settings/header-top-settings.component';
import { HeaderDesktopMenuComponent } from './header/header-desktop-menu/header-desktop-menu.component';
import { HeaderMobileMenuComponent } from './header/header-mobile-menu/header-mobile-menu.component';
import { CommonModule } from '@angular/common';
import { LanguageMenuComponent } from './header/language-menu/language-menu.component';
import { AngularModule } from 'src/app/angular.module';
import { HeaderLogoComponent } from './header/header-logo/header-logo.component';

@NgModule({
  imports: [CommonModule, AngularModule],
  declarations: [
    HeaderComponent,
    HeaderTopSettingsComponent,
    LanguageMenuComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuComponent,
    HeaderLogoComponent,
  ],
  exports: [
    HeaderComponent,
    HeaderTopSettingsComponent,
    LanguageMenuComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuComponent,
    HeaderLogoComponent,
  ],
  providers: [],
})
export class LayoutModule {}
