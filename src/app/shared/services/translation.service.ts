import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable, of } from 'rxjs';

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
  translations: any;
  currentLanguage: string = 'en';
  frLanguagesArray: string[] = ['fr', 'fr-FR', 'fr-BE', 'fr-CA', 'fr-LU', 'fr-MC', 'fr-CH'];
  resourcesLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    if (this.frLanguagesArray.indexOf(window.navigator.language) !== -1) {
      this.setCurrentLanguage('fr');
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
