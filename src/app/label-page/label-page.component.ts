import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';

@Component({
  selector: 'app-label',
  templateUrl: './label-page.component.html',
  styleUrls: ['./label-page.component.scss'],
})
export class LabelPageComponent implements OnInit {
  constructor(
    private meta: Meta,
    private translationService: TranslationService,
  ) {}

  ngOnInit(): void {
    this.defineMetadata();
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.addTag({ name: 'description', content: `${translationPipe.transform('METADATA_LABEL_DESCRIPTION')}` });
    this.meta.addTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_LABEL_KEYWORDS')}` });
    this.meta.addTag({ name: 'author', content: 'Infinity Records' });
  }
}
