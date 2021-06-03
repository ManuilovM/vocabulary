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
  message: string ="";

  word: string ; // wordName

  wordObj: Word; // wordInstance 

  wordFormControl: FormControl = new FormControl("");

  
  onAddWordButtonClick(){
  
    if(!this.wordFormControl.value){
      this.showAlertMessage("Введите слово!");
      return;
    }

    let wordStr:string = this.wordFormControl.value;
    let wordObj:Word = {name: wordStr, checked: 0}; 

    if(!this.wordService.isUnique(wordStr)){
      this.showAlertMessage("Это слово уже добавлено!");
      return;
    }

    this.wordService.addWordToMainList(wordStr);
    this.wordService.addWordToCurrentList(wordObj);
    this.fillWordProperties();
    return;
  }

   fillWordProperties (){
     console.log("realFWP")
    if ( (!this.wordService.isCurrentList()) && (!this.wordService.isCheckedList()) ) {
      this.word = "В хранилище нет слов. Добавте слова чтобы начать тренировку";
      return;
    }
    let word:Word = this.wordService.getWord();
    if(!word) {
      this.word = "Вы повторили все слова. Подождите день чтобы повторить эти слова снова или добавте новые";
      return;
    }
    this.word = word.name;
    this.wordObj = word;
  }

  showAlertMessage(msg: string) {
    this.message = msg;
    setTimeout(this.closeAlertMessage, 2000, this);
  }

  closeAlertMessage(component){
    component.message= "";
  }

  constructor(public wordService: WordService) {}

  ngOnInit(): void {
    this.fillWordProperties();
  }
}
