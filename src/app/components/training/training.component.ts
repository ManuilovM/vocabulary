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
  message: string = "Вы должны заполнить поле!";

  word: string = "Слово";

  wordFormControl: FormControl = new FormControl("");

  /*
  onAddWordButtonClick(){
    if(!this.wordFormControl.value){
      this.openAlertMessage();
      setTimeout(this.closeAlertMessag,2000);
      return;
    }
    if(!this.ws.isUnique(wordStr)){
      this.openAlertMessage("");
      setTimeout(this.closeAlertMessag,2000);
      return;
    }

    let wordStr:string = this.wordFormControl.value;
    let wordObj:Word = {name: wordStr, cheked: 0}; 
    this.ws.addWordStrToWordStorage();
    th
    th
  }*/

  openAlertMessage(msg: string) {
    this.message = msg;
  }

  closeAlertMessage(){
    this.message ="";
  }

  constructor(public ws: WordService) {}

  ngOnInit(): void {}
}
