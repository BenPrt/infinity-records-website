import { Component, OnInit } from '@angular/core';
import 'hammerjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loading-animation', [
      state(
        'typo-toFade',
        style({
          opacity: 0,
        }),
      ),
      state(
        'typo-faded',
        style({
          opacity: 1,
        }),
      ),
      transition('typo-toFade => typo-faded', animate('2s ease-in-out')),
      state(
        'infos-toFade',
        style({
          opacity: 0,
        }),
      ),
      state(
        'infos-faded',
        style({
          opacity: 1,
        }),
      ),
      transition('infos-toFade => infos-faded', animate('1s ease-in-out')),
    ]),
  ],
})
export class AppComponent implements OnInit {
  typoAnimationState: string = 'typo-toFade';
  infosAnimationState: string = 'infos-toFade';

  constructor() {}

  ngOnInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    this.drawLogo();
    setTimeout(() => {
      this.typoAnimationState = 'typo-faded';
      setTimeout(() => { this.infosAnimationState = 'infos-faded'; }, 1000);
    }, 3500);
  }

  drawLogo(): void {
    const paths = Array.from(document.querySelectorAll('#header-logos-logo path'));
    paths.forEach((arrayPath) => {
      const path = <SVGPathElement>arrayPath;
      const length = path.getTotalLength();
      path.style.transition = path.style.webkitTransition = 'none';
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = String(length);
      path.getBoundingClientRect();
      path.style.transition = path.style.webkitTransition = 'stroke-dashoffset 4s ease-in-out';
      path.style.strokeDashoffset = '0';
    });
  }
}
