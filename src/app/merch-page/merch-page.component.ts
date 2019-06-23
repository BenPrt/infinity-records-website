import { Component, OnInit, OnDestroy } from '@angular/core';
import { MerchInfo } from 'src/app/models/merch-info';
import { merchInfos } from 'src/assets/content/merch-content';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-merch',
  templateUrl: './merch-page.component.html',
  styleUrls: ['./merch-page.component.scss'],
})
export class MerchPageComponent implements OnInit, OnDestroy {
  currentProduct: MerchInfo;
  currentProductIdSubscription: Subscription;
  constructor(private merchService: MerchService) {}

  ngOnInit() {
    this.initCurrentProduct();
  }

  initCurrentProduct() {
    this.currentProductIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId) => {
      this.displayProduct(currentId);
    });
    this.merchService.setCurrentPageId(0);
  }

  ngOnDestroy():void {
    this.currentProductIdSubscription.unsubscribe();
  }

  displayProduct(productId: number) {
    this.currentProduct = merchInfos[productId];
  }
}
