import { Injectable, HostListener } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScrollService {
  screenHeight = new BehaviorSubject(0);
  scrollPos = new BehaviorSubject(0);

  constructor() {
    window.addEventListener("scroll", this.scroll, {
      capture: true,
      passive: true,
    });

    this.screenHeight.next(window.innerHeight);
    this.scroll();

    fromEvent(window, "resize").subscribe((e: any) => {
      this.screenHeight.next(e.target.innerHeight);
    });
  }

  scroll = () => {
    this.scrollPos.next(window.pageYOffset);
    this.checkHeaderFixed();
  };

  headerFixed = new BehaviorSubject(false);
  checkHeaderFixed() {
    // If scrolled 100vh and still not fixed
    if (this.scrollPos.value < this.screenHeight.value)
      this.headerFixed.next(false);
    if (this.scrollPos.value > this.screenHeight.value)
      this.headerFixed.next(true);
  }

  scrollToSection(id: number) {
    document
      .querySelector("#section-" + id)
      .scrollIntoView({ behavior: "smooth" });
  }
}
