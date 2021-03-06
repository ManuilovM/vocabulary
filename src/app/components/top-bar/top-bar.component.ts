import { Component, OnInit } from "@angular/core";
import { WordService } from "src/app/services/word.service";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.css"],
})
export class TopBarComponent implements OnInit {
  pathName: string = window.location.pathname;
  pageTitle: string = this.getPageTitle();

  isTrainingComponentOpen(): boolean {
    return this.pathName === "/EnRu" || this.pathName == "/RuEn";
  }

  getPageTitle(): string {
    if (this.pathName === "/") return "Главная";
    if (this.pathName === "/EnRu") return "Англо-русский режим";
    if (this.pathName === "/RuEn") return "Русско-английский режим";
  }

  constructor() {}

  ngOnInit(): void {

  }
}
