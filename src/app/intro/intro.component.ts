import { Component, OnInit, LOCALE_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { ScrollService } from "../home/scroll.service";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
})
export class IntroComponent implements OnInit {
  backgroundOpacity = 0;
  knowMoreOpacity = 0;
  hovered = false;
  selectedLanguage = "en";
  languages = ["en", "tr", "es"];

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    public scrollService: ScrollService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = this.locale.substr(0, 2);

    const seenBefore = localStorage.getItem("seenBefore");
    if (seenBefore) {
      this.welcomeBackEffects();
    } else {
      this.introEffects();
    }
  }

  async introEffects() {
    await new Promise((r) => setTimeout(r, 1000));
    await this.typeText("hi", 75);
    this.backgroundOpacity = 1;
    await new Promise((r) => setTimeout(r, 1500));
    await this.typeText("im", 75);
    await this.typeText("name", 75);
    await new Promise((r) => setTimeout(r, 500));
    await this.typeText("passionate", 75);
    await new Promise((r) => setTimeout(r, 100));
    if (this.router.url === "/") {
      this.router.navigateByUrl("home");
    }
    this.knowMoreOpacity = 1;
    this.hovered = true;
    await new Promise((r) => setTimeout(r, 800));
    this.hovered = false;
    setTimeout(() => {
      localStorage.setItem("seenBefore", "true");
    }, 5000);
  }

  async welcomeBackEffects() {
    if (this.router.url === "/") {
      this.router.navigateByUrl("home");
    }
    await new Promise((r) => setTimeout(r, 800));
    this.backgroundOpacity = 1;
    await this.typeText("welcomeBack", 75);
    this.knowMoreOpacity = 1;
    this.hovered = true;
    await new Promise((r) => setTimeout(r, 800));
    this.hovered = false;
    await new Promise((r) => setTimeout(r, 200));
  }

  async typeText(obj: string, speed: number) {
    const total_length = this[obj].source.length;
    for (let i = 0; i < total_length; i++) {
      const nextChar = this[obj].source[i];
      this[obj].display += nextChar;
      const randomSpeed = Math.random() * speed + speed / 2;
      await new Promise((r) => setTimeout(r, randomSpeed));
    }
  }

  hi = {
    source: $localize`:@@Intro.Hi:Hi`,
    display: "",
  };
  im = {
    source: $localize`:@@Intro.Im:I am`,
    display: "",
  };
  name = {
    source: "Koray Kural,",
    display: "",
  };
  passionate = {
    source: $localize`:@@Intro.Passionate:a passionate developer.`,
    display: "",
  };
  welcomeBack = {
    source: $localize`:@@Intro.Welcome:Welcome back`,
    display: "",
  };
}
