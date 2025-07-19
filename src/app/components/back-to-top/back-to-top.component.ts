import { Component, HostListener } from "@angular/core";

@Component({
  selector: "app-back-to-top",
  templateUrl: "./back-to-top.component.html",
  styleUrls: ["./back-to-top.component.css"],
})
export class BackToTopComponent {
  visible = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.visible = window.scrollY > 50;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
