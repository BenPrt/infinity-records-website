import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { MobileService } from "./service/mobile.service";
import { interval, Subscription } from "rxjs";
import "hammerjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    trigger("loading-animation", [
      state(
        "content-toFade",
        style({
          opacity: 0
        })
      ),
      state(
        "content-faded",
        style({
          opacity: 1
        })
      ),
      transition("content-toFade => content-faded", animate("2s ease-in"))
    ]),

    trigger("displayMenu-animation", [
      state(
        "hiddenMenu",
        style({
          left: "-70%"
        })
      ),
      state(
        "displayedMenu",
        style({
          left: 0
        })
      ),
      transition("hiddenMenu <=> displayedMenu", animate("0.4s ease-out")),

      state(
        "hiddenMenu_overlay",
        style({
          opacity: 0,
          display: "none"
        })
      ),
      state(
        "displayedMenu_overlay",
        style({
          opacity: 0.3,
          display: "block"
        })
      ),
      transition(
        "hiddenMenu_overlay <=> displayedMenu_overlay",
        animate("0.4s ease-out")
      )
    ])
  ]
})
export class AppComponent implements OnInit {
  animateLogo = true;
  contentAnimationState = "content-toFade";
  contentDisplayed = false;
  menuDisplayed = false;
  displayMenuState = "hiddenMenu";
  overlayState = "hiddenMenu_overlay";
  isMobile = false;
  routerSubscription: Subscription;

  constructor(
    private location: Location,
    private mobileService: MobileService
  ) {}

  ngOnInit() {
    this.isMobile = this.mobileService.isMobile();
    const path = this.location.path();
    if (path !== "/home" && path !== "") {
      this.animateLogo = false;
      this.contentAnimationState = "content-faded";
      this.contentDisplayed = true;
    } else {
      interval(7000).subscribe(i => {
        this.contentAnimationState = "content-faded";
        this.contentDisplayed = true;
      });
    }
  }

  onSwipeLeft() {
    this.hideMenu();
  }

  onSwipeRight() {
    this.displayMenu();
  }

  displayMenu() {
    this.menuDisplayed = true;
    this.displayMenuState = "displayedMenu";
    this.overlayState = "displayedMenu_overlay";
  }

  hideMenu() {
    this.menuDisplayed = false;
    this.displayMenuState = "hiddenMenu";
    this.overlayState = "hiddenMenu_overlay";
  }
}
