import { Component, OnInit } from "@angular/core";
import { ScrollService } from "../scroll.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  links = [
    {
      text: $localize`:@@Navbar.One:Who am I`,
      selected: true,
      id: 1,
    },
    {
      text: $localize`:@@Navbar.Two:What do I know`,
      selected: false,
      id: 2,
    },
    {
      text: $localize`:@@Navbar.Three:What have I done`,
      selected: false,
      id: 3,
    },
  ];

  get selectedLink() {
    const i = this.links.findIndex((x) => x.selected);
    return i > -1 ? this.links[i].text : "";
  }

  constructor(public scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.scrollPos.subscribe((val) => this.checkActiveLink(val));
  }

  checkActiveLink(scrollPos: number) {
    const screenHeight = this.scrollService.screenHeight.value;
    for (let i = 1; i <= 3; i++) {
      const el = document
        .querySelector("#section-" + i)
        .getBoundingClientRect();
      if (el.top <= 100 && el.bottom > 100) {
        this.links[i - 1].selected = true;
      } else {
        this.links[i - 1].selected = false;
      }
    }
  }
}
