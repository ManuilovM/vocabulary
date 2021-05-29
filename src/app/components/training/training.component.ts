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
      this.showAlertMessage();
      return
    }
    if(!this.ws.isUnique(wordStr)){
      this.showAlertMessage();
      return
    }

    let wordStr:string = this.wordFormControl.value;
    let wordObj:Word = {name: wordStr, cheked: 0}; 
    this.ws.addWordStrToWordStorage();
    th
    th
  }*/

  showAlertMessage(msg: string) {
    this.message = msg;
    setTimeout(()=>{
      this.message=""
    }, 2000);
  }

  constructor(public ws: WordService) {}

  ngOnInit(): void {}
}
