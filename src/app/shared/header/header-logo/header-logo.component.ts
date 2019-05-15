import { Component, OnInit, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'header-logo-component',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
  animations: [
    trigger('loading-animation', [
      state('typo-toFade', style({
        opacity: 0
      })),
      state('typo-faded', style({
        opacity: 1
      })),
      transition('typo-toFade => typo-faded', animate('2s ease-in-out'))
    ])
  ]
})

export class HeaderLogoComponent implements OnInit {
  @Input() animateLogo: boolean;
  typoAnimationState = 'typo-toFade';

  constructor() { }

  ngOnInit() {
    if (this.animateLogo) {
      this.drawLogo();
      setTimeout(() => {
        this.typoAnimationState = 'typo-faded';
      }, 3500);
    } else {
      this.typoAnimationState = 'typo-faded';
    }
  }


  drawLogo() {
    const paths = Array.from(document.querySelectorAll('#header-logos-logo path'));
    paths.forEach(arrayPath => {
      const path = <SVGPathElement>arrayPath;
      const length = path.getTotalLength();
      path.style.transition = path.style.webkitTransition = 'none';
      path.style.strokeDasharray = length + ' ' + length;
      path.style.strokeDashoffset = String(length);
      path.getBoundingClientRect();
      path.style.transition = path.style.webkitTransition = 'stroke-dashoffset 4s ease-in-out';
      path.style.strokeDashoffset = '0';
    });
  }

}
