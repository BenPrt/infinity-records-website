import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mobile-menu-component',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})

export class MobileMenuComponent implements OnInit {
  @Output() arrowClicked = new EventEmitter();

  menuContent = [
    { name: 'Accueil', path: '/home' },
    { name: 'News', path: '' },
    { name: 'Contact', path: '/contact' }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  hideMenu() {
    this.arrowClicked.emit();
  }

  goTo(item) {
    this.arrowClicked.emit();
    this.router.navigate([item.path]);
  }

}
