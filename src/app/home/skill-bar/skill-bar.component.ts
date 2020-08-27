import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { ScrollService } from "../scroll.service";
import { Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-skill-bar",
  templateUrl: "./skill-bar.component.html",
  styleUrls: ["./skill-bar.component.scss"],
})
export class SkillBarComponent implements OnInit {
  @Input() percentage: number;
  @Input() color: string;
  width = 0;
  id = "";
  $destroy = new Subject();

  constructor(
    public scrollService: ScrollService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = this.uuidv4();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    const top = document.getElementById(this.id).getBoundingClientRect().top;

    this.scrollService.scrollPos
      .pipe(takeUntil(this.$destroy))
      .subscribe((pos) => {
        if (pos + this.scrollService.screenHeight.value > top) {
          this.setWidth();
          this.$destroy.next(true);
        }
      });
  }

  async setWidth() {
    this.width = this.percentage;
    this.cdr.detectChanges();
  }

  uuidv4() {
    return "axxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
