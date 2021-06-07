import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Word } from "src/app/classes/word-obj";
import { WordService } from "src/app/services/word.service";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"],
})
export class TrainingComponent implements OnInit {
  wordInstanceName = window.location.pathname + "WordInstance";
  alertMessage: string = "";

  wordName: string;

  wordInstance: Word;

  wordFormControl: FormControl = new FormControl("");

  constructor(public wordService: WordService) {}

  ngOnInit(): void {
    this.wordService.fillListNameProperties(window.location.pathname);
    this.fillWordProperties();
  }

  onAddWordButtonClick() {
    if (!this.wordFormControl.value) {
      this.showAlertMessage("Введите слово!");
      return;
    }

    let wordStr: string = this.wordFormControl.value;
    let wordObj: Word = { name: wordStr, checkedTimes: 0 };

    if (!this.wordService.isUnique(wordStr)) {
      this.showAlertMessage("Это слово уже добавлено!");
      return;
    }

    this.wordService.addWordToMainList(wordStr);
    this.wordService.addWordToCurrentList(wordObj);
    this.fillWordProperties();
    this.wordFormControl.reset();
    return;
  }

  fillWordProperties() {
    if (
      !this.wordInstance &&
      localStorage.getItem(this.wordInstanceName) &&
      JSON.parse(localStorage.getItem(this.wordInstanceName))
    )
      this.wordInstance = JSON.parse(localStorage.getItem(this.wordInstanceName));

    if (this.wordInstance) this.wordService.addWordToCurrentList(this.wordInstance);

    if (
      !this.wordService.isCurrentListAndHasItems() &&
      !this.wordService.isCheckedListAndHasItems()
    ) {
      this.wordName =
        "В хранилище нет слов. Добавьте слова чтобы начать тренировку";
      return;
    }

    let word: Word = this.wordService.takeWord();

    if (!word) {
      this.wordName =
        "Вы повторили все слова на сегодня. Подождите день чтобы повторить эти слова снова или добавьте новые";
      return;
    }

    this.wordName = word.name;
    this.wordInstance = word;
    localStorage.setItem(this.wordInstanceName, JSON.stringify(this.wordInstance));
  }

  clearWordProperties() {
    this.wordInstance = null;
    this.wordName = "";
    localStorage.removeItem(this.wordInstanceName);
  }

  showAlertMessage(msg: string) {
    this.alertMessage = msg;
    setTimeout(this.closeAlertMessage, 2000, this);
  }

  closeAlertMessage(component) {
    component.alertMessage = "";
  }

  onSayYes() {
    if(!this.wordInstance) return
    let todayStr: string = new Date().toDateString();
    this.wordInstance.lastCheck = todayStr;
    this.wordInstance.checkedTimes++;

    if (this.wordInstance.checkedTimes == 5)
      this.wordService.deleteWordFromMainList(this.wordName);
    else this.wordService.addWordToCheckedList(this.wordInstance);

    this.clearWordProperties();
    this.fillWordProperties();
  }

  onSayNo() {
    if(!this.wordInstance) return
    this.wordService.addWordToCurrentList(this.wordInstance);
    this.clearWordProperties();
    this.fillWordProperties();
  }
}
