import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Pipe({ name: 'translation' })
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: string): string {
    return this.translationService.translate(value);
  }
}
