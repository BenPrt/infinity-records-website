import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MerchService } from 'src/app/shared/services/merch.service';
import { Subscription } from 'rxjs';
import { merchInfos } from 'src/assets/content/merch-content';

@Component({
  selector: 'merch-banner',
  templateUrl: './merch-banner.component.html',
  styleUrls: ['./merch-banner.component.scss'],
})
export class MerchBannerComponent implements OnInit, OnDestroy {
  currentProductId: number;
  currentIdSubscription: Subscription;
  constructor(private merchService: MerchService) {}

  ngOnInit(): void {
    this.initCurrentProductId();
  }

  initCurrentProductId(): void {
    this.currentProductId = this.merchService.getCurrentPageId();
    this.currentIdSubscription = this.merchService.currentPageIdHasChanged.subscribe((currentId) => {
      this.currentProductId = currentId;
    });
  }

  ngOnDestroy(): void {
    this.currentIdSubscription.unsubscribe();
  }

  isDisabled(direction: string): boolean {
    if (
      (direction === 'previous' && this.currentProductId === 0) ||
      (direction === 'next' && this.currentProductId === merchInfos.length - 1)
    ) {
      return true;
    }
    return false;
  }

  goToPreviousPage(): void {
    this.merchService.goToPreviousPage();
  }

  goToNextPage(): void {
    this.merchService.goToNextPage();
  }
}
