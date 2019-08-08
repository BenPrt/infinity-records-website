import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { LanguageOption } from 'src/app/models/translation';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'language-menu-component',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss'],
  host: {
    '(window:click)': 'hideMenu()',
  },
  animations: [
    trigger('arrowRotation', [
      state(
        'down',
        style({
          transform: 'rotate(0deg)',
        }),
      ),
      state(
        'up',
        style({
          transform: 'rotate(180deg)',
        }),
      ),
      transition('down <=> up', [animate('200ms')]),
    ]),
    trigger('displayMenu', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate('100ms', style({ transform: 'translateY(0)' , opacity: 0.5 })),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('150ms', style({ transform: 'translateY(-10%)' , opacity: 0 })),
      ]),
    ]),
  ],
})
export class LanguageMenuComponent implements OnInit {
  constructor(private translationService: TranslationService) {}
  languageList: LanguageOption[] = [
    {
      code: 'en',
      label: 'ENGLISH_LANGUAGE',
    },
    {
      code: 'fr',
      label: 'FRENCH_LANGUAGE',
    },
  ];
  currentLanguage: LanguageOption;
  // Animations state
  arrowState: string = 'down';
  menuState: string = 'hidden';

  menuIsDisplayed: boolean = false;

  ngOnInit(): void {
    this.getCurrentLanguage();
  }

  getCurrentLanguage(): void {
    this.currentLanguage = this.languageList.find((language: LanguageOption) => {
      return language.code === this.translationService.getCurrentLanguage();
    });
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuIsDisplayed = !this.menuIsDisplayed;
    this.arrowState = this.arrowState === 'down' ? 'up' : 'down';
  }

  hideMenu(): void {
    this.menuIsDisplayed = false;
    this.arrowState = 'down';
  }

  selectLanguage(language: LanguageOption): void {
    this.translationService.setCurrentLanguage(language.code);
    this.hideMenu();
    this.getCurrentLanguage();
  }

  isSelected(language: LanguageOption): boolean {
    if (language === this.currentLanguage) {
      return true;
    }
    return false;
  }
}
