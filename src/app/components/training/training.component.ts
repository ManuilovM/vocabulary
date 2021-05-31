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

  word: string = this.wordService.getWord();

  wordFormControl: FormControl = new FormControl("");

  
  onAddWordButtonClick(){
  
    if(!this.wordFormControl.value){
      this.showAlertMessage("Введите слово!");
      return;
    }

    let wordStr:string = this.wordFormControl.value;
    let wordObj:Word = {name: wordStr, cheked: 0}; 

    if(!this.wordService.isUnique(wordStr)){
      this.showAlertMessage("Это слово уже добавлено!");
      return;
    }

    this.wordService.addWordStrToWordStorage(wordStr);
    this.wordService.addWordObjToCurentList(wordObj);
    this.word = this.wordService.getWord()
    return;
  }



  showAlertMessage(msg: string) {
    this.message = msg;
    setTimeout(this.closeAlertMessage, 2000, this);
  }

  closeAlertMessage(component){
    component.message= "";
  }

  constructor(public wordService: WordService) {}

  ngOnInit(): void {}
}
