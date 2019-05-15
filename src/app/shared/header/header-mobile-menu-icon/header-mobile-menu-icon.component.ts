import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header-mobile-menu-icon-component',
  templateUrl: './header-mobile-menu-icon.component.html',
  styleUrls: ['./header-mobile-menu-icon.component.scss']
})

export class HeaderMobileMenuIconComponent implements OnInit {
  @Output() menuClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  displayMenu() {
    this.menuClicked.emit();
  }

}
