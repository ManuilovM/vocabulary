import { Injectable } from "@angular/core";
import { Word } from "../classes/word-obj";

@Injectable({
  providedIn: "root",
})
export class WordService {
  constructor() {}

  isUnique(word: string): boolean {
    let mainListFromLocalStorage: string = localStorage.getItem("mainList");
    if (!mainListFromLocalStorage) return true;
    let mainList: Array<string> = JSON.parse(mainListFromLocalStorage);
    if (mainList.indexOf(word) === -1) return true;
    else return false;
  }

  addWordToMainList(word: string) {
    let newMainList: Array<string> = [];
    let mainListFromLocalStorage: string = localStorage.getItem("mainList");

    if (mainListFromLocalStorage) {
      newMainList = JSON.parse(mainListFromLocalStorage);
    }

    newMainList.push(word);
    localStorage.setItem("mainList", JSON.stringify(newMainList));
  }

  addWordToCurrentList(word: Word) {
    let newCurrentList: Array<Word> = [];
    let currentListFromLocalStorage: string = localStorage.getItem(
      "currentList"
    );

    if (currentListFromLocalStorage) {
      newCurrentList = JSON.parse(currentListFromLocalStorage);
    }

    newCurrentList.push(word);
    localStorage.setItem("currentList", JSON.stringify(newCurrentList));
  }

  takeWord(): Word {
    console.log("realTakeWord");
    let takenWords: Array<Word> =[];
    let currentList : Array<Word> =[]

    if(!JSON.parse(localStorage.getItem("isCheckedListTakenToday"))){
      takenWords= this.takeWordsFromCheckedList();
      if(!takenWords) takenWords =[]; 
      localStorage.setItem("isCheckedListTakenToday", JSON.stringify(true));
    }
    if(this.isCurrentListAndHasItems() ) currentList  = JSON.parse(localStorage.getItem("currentList"));
    else if (!takenWords.length) return;

    currentList = currentList.concat(takenWords);
    let randomIndex:number = Math.floor(Math.random()*(currentList.length));
    let word: Word = currentList.splice(randomIndex, 1)[0];
    localStorage.setItem("currentList",JSON.stringify(currentList));
    return word;
  }

  isCurrentListAndHasItems(): boolean {
    return (
      !!localStorage.getItem("currentList") &&
      !!JSON.parse(localStorage.getItem("currentList")).length
    );
  }

  isCheckedListAndHasItems(): boolean {
    return (
      !!localStorage.getItem("checkedList") &&
      !!JSON.parse(localStorage.getItem("checkedList")).length
    );
  }

  takeWordsFromCheckedList(): Array<Word> {
    let takenWords: Array<Word> = [];
    let checkedList: Array<Word>;
    if (!localStorage.getItem("checkedList")) return;
    checkedList = JSON.parse(localStorage.getItem("checkedList"));
    if (checkedList.length == 0) return;
    let todayStr: string = new Date().toDateString();

    checkedList = checkedList.filter((item) => {
      let isTodayChecked: Boolean = item.lastCheck == todayStr;
      if (!isTodayChecked) takenWords.push(item);
      return isTodayChecked;
    });
    localStorage.setItem("checkedList", JSON.stringify(checkedList));
    return takenWords;
  }


}
