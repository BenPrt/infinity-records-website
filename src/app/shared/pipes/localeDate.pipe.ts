import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Pipe({ name: 'localeDate' })
export class LocaleDatePipe extends DatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {
    super(translationService.getCurrentLanguage());
  }

  transform(value: string): string {
    const datePipe = new DatePipe(this.translationService.getCurrentLanguage());
    return datePipe.transform(value);
  }
}
