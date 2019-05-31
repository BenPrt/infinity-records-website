import { Component } from '@angular/core';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [],
})
export class FooterComponent {
  actualYear : number = new Date().getFullYear();
  constructor() {}
}
