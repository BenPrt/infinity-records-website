import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularModule } from 'src/app/angular.module';

import { DesktopSettingsComponent } from './header/desktop-settings/desktop-settings.component';
import { HeaderDesktopMenuComponent } from './header/header-desktop-menu/header-desktop-menu.component';
import { HeaderMobileMenuComponent } from './header/header-mobile-menu/header-mobile-menu.component';
import { LanguageMenuComponent } from './header/language-menu/language-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
  imports: [CommonModule, AngularModule, RouterModule],
  declarations: [
    HeaderDesktopMenuComponent,
    DesktopSettingsComponent,
    LanguageMenuComponent,
    HeaderMobileMenuComponent,
    MobileMenuComponent,
  ],
  exports: [
    HeaderDesktopMenuComponent,
    DesktopSettingsComponent,
    LanguageMenuComponent,
    HeaderMobileMenuComponent,
    MobileMenuComponent,
  ],
  providers: [],
})
export class LayoutModule {}
