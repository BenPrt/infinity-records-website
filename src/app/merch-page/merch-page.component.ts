import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchInfo } from 'src/app/models/merch-info';
import { merchInfos } from 'src/assets/content/merch-content';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { TranslationService } from 'src/app/shared/services/translation.service';
import { TranslationPipe } from 'src/app/shared/pipes/translation.pipe';

@Component({
  selector: 'app-merch',
  templateUrl: './merch-page.component.html',
  styleUrls: ['./merch-page.component.scss'],
})
export class MerchPageComponent implements OnInit, OnDestroy {
  currentProduct: MerchInfo;
  currentProductIdSubscription: Subscription;
  constructor(private merchService: MerchService, private meta: Meta, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.initCurrentProduct();
    this.defineMetadata();
  }

  initCurrentProduct(): void {
    this.currentProductIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId) => {
      this.displayProduct(currentId);
    });
    this.merchService.setCurrentPageId(0);
  }

  defineMetadata(): void {
    const translationPipe = new TranslationPipe(this.translationService);
    this.meta.updateTag({ name: 'title', content: 'Infinity Records - Merchandising' });
    this.meta.updateTag({ name: 'description', content: `${translationPipe.transform('METADATA_MERCH_DESCRIPTION')}` });
    this.meta.updateTag({ name: 'keywords', content: `${translationPipe.transform('METADATA_MERCH_KEYWORDS')}` });
    this.meta.updateTag({ name: 'author', content: 'Infinity Records' });
  }

  ngOnDestroy(): void {
    this.currentProductIdSubscription.unsubscribe();
  }

  displayProduct(productId: number) {
    this.currentProduct = merchInfos[productId];
  }
}
