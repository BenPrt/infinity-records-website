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
  constructor(private meta: Meta, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.defineMetadata();
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.updateTag({ name: 'title', content: `${translationPipe.transform('METADATA_LABEL_TITLE')}` });
    this.meta.updateTag({ name: 'description', content: `${translationPipe.transform('METADATA_LABEL_DESCRIPTION')}` });
    this.meta.updateTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_LABEL_KEYWORDS')}` });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:url',
      content: 'https://infinity-records.fr/label',
    });
    this.meta.updateTag({ prefix: 'og: http://ogp.me/ns#', property: 'og:type', content: 'website' });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:title',
      content: `${translationPipe.transform('METADATA_LABEL_TITLE')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:description',
      content: `${translationPipe.transform('METADATA_LABEL_DESCRIPTION')}`,
    });
    this.meta.updateTag({
      prefix: 'og: http://ogp.me/ns#',
      property: 'og:image',
      content: 'https://infinity-records.fr/assets/img/label/studio.jpg',
    });
  }
}
