import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularModule } from 'src/app/angular.module';

import { HeaderComponent } from './header/header.component';
import { DesktopSettingsComponent } from './header/desktop-settings/desktop-settings.component';
import { HeaderDesktopMenuComponent } from './header/header-desktop-menu/header-desktop-menu.component';
import { HeaderMobileMenuComponent } from './header/header-mobile-menu/header-mobile-menu.component';
import { LanguageMenuComponent } from './header/language-menu/language-menu.component';
import { HeaderLogoComponent } from './header/header-logo/header-logo.component';

@NgModule({
  imports: [CommonModule, AngularModule, RouterModule],
  declarations: [
    HeaderComponent,
    DesktopSettingsComponent,
    LanguageMenuComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuComponent,
    HeaderLogoComponent,
  ],
  exports: [
    HeaderComponent,
    DesktopSettingsComponent,
    LanguageMenuComponent,
    HeaderDesktopMenuComponent,
    HeaderMobileMenuComponent,
    HeaderLogoComponent,
  ],
  providers: [],
})
export class LayoutModule {}
