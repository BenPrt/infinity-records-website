import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

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
  frLanguagesArray: string[] = ['fr', 'fr-FR', 'fr-BE', 'fr-CA', 'fr-LU', 'fr-MC', 'fr-CH'];
  public resourcesLoaded = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    if (this.frLanguagesArray.indexOf(window.navigator.language) !== -1) {
      this.getTranslationFile('fr');
    } else {
      this.getTranslationFile('en');
    }
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
