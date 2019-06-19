import { Injectable, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export function translationFactoryResources(translationService: TranslationService) {
  return () => {
    return new Promise((resolve) => {
      translationService.resourcesLoaded.subscribe((loaded: any) => {
        resolve();
      });
    });
  };
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  isBrowser: boolean;
  translations: any;
  currentLanguage: string = 'en';
  frLanguagesArray: string[] = ['fr', 'fr-FR', 'fr-BE', 'fr-CA', 'fr-LU', 'fr-MC', 'fr-CH'];
  resourcesLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      if (this.frLanguagesArray.indexOf(window.navigator.language) !== -1) {
        this.setCurrentLanguage('fr');
      } else {
        this.setCurrentLanguage('en');
      }
    } else {
      this.setCurrentLanguage('en');
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  setCurrentLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.getTranslationFile(languageCode);
  }

  translate(key: string): string {
    return this.translations && this.translations[key] ? this.translations[key] : key;
  }

  getTranslationFile(language: string): Subscription {
    return this.http.get(`assets/translations/${language}.json`).subscribe((res) => {
      this.translations = res;
      this.resourcesLoaded.emit(true);
    });
  }
}
