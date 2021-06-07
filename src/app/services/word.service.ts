import { Injectable } from "@angular/core";
import { Word } from "../classes/word-obj";

@Injectable({
  providedIn: "root",
})
export class WordService {
  currentListName:string;
  mainListName:string;
  checkedListName:string;
  isCheckedListTakenTodayName:string;
  constructor() {}

  isUnique(word: string): boolean {
    let mainListFromLocalStorage: string = localStorage.getItem(this.mainListName);
    if (!mainListFromLocalStorage) return true;
    let mainList: Array<string> = JSON.parse(mainListFromLocalStorage);
    if (mainList.indexOf(word) === -1) return true;
    else return false;
  }

  addWordToMainList(word: string) {
    let newMainList: Array<string> = [];
    let mainListFromLocalStorage: string = localStorage.getItem(this.mainListName);

    if (mainListFromLocalStorage) {
      newMainList = JSON.parse(mainListFromLocalStorage);
    }

    newMainList.push(word);
    localStorage.setItem(this.mainListName, JSON.stringify(newMainList));
  }

  addWordToCurrentList(word: Word) {
    let newCurrentList: Array<Word> = [];
    let currentListFromLocalStorage: string = localStorage.getItem(
      this.currentListName
    );

    if (currentListFromLocalStorage) {
      newCurrentList = JSON.parse(currentListFromLocalStorage);
    }

    newCurrentList.push(word);
    localStorage.setItem(this.currentListName, JSON.stringify(newCurrentList));
  }
  
  addWordToCheckedList(word: Word){
    let newCheckedList: Array<Word> = [];
    let checkedListFromLocalStorage: string = localStorage.getItem(
      this.checkedListName
    );

    if (checkedListFromLocalStorage) {
      newCheckedList = JSON.parse(checkedListFromLocalStorage);
    }

    newCheckedList.push(word);
    localStorage.setItem(this.checkedListName, JSON.stringify(newCheckedList));
  }

  deleteWordFromMainList(word:string){
    let newMainList: Array<string> =  JSON.parse(localStorage.getItem(
      this.mainListName
    ));
    newMainList =newMainList.filter((item)=> item !== word);
    localStorage.setItem(this.mainListName, JSON.stringify(newMainList));
  }

  takeWord(): Word {
    let takenWords: Array<Word> =[];
    let currentList : Array<Word> =[]

    if(!JSON.parse(localStorage.getItem(this.isCheckedListTakenTodayName))){
      takenWords= this.takeWordsFromCheckedList();
      if(!takenWords) takenWords =[]; 
      localStorage.setItem(this.isCheckedListTakenTodayName, JSON.stringify(true));
    }
    if(this.isCurrentListAndHasItems() ) currentList  = JSON.parse(localStorage.getItem(this.currentListName));
    else if (!takenWords.length) return;

    currentList = currentList.concat(takenWords);
    let randomIndex:number = Math.floor(Math.random()*(currentList.length));
    let word: Word = currentList.splice(randomIndex, 1)[0];
    localStorage.setItem(this.currentListName,JSON.stringify(currentList));
    return word;
  }

  isCurrentListAndHasItems(): boolean {
    return (
      !!localStorage.getItem(this.currentListName) &&
      !!JSON.parse(localStorage.getItem(this.currentListName)).length
    );
  }

  isCheckedListAndHasItems(): boolean {
    return (
      !!localStorage.getItem(this.checkedListName) &&
      !!JSON.parse(localStorage.getItem(this.checkedListName)).length
    );
  }

  takeWordsFromCheckedList(): Array<Word> {
    let takenWords: Array<Word> = [];
    let checkedList: Array<Word>;
    if (!localStorage.getItem(this.checkedListName)) return;
    checkedList = JSON.parse(localStorage.getItem(this.checkedListName));
    if (checkedList.length == 0) return;
    let todayStr: string = new Date().toDateString();

    checkedList = checkedList.filter((item) => {
      let isTodayChecked: Boolean = item.lastCheck == todayStr;
      if (!isTodayChecked) takenWords.push(item);
      return isTodayChecked;
    });
    localStorage.setItem(this.checkedListName, JSON.stringify(checkedList));
    return takenWords;
  }

  fillListNameProperties(pathname:string){
    this.currentListName = pathname +"CurrentList";
    this.mainListName =pathname + "MainList";
    this.checkedListName =pathname +"CheckedList";
    this.isCheckedListTakenTodayName=pathname +"IsCheckedListTakenToday";
  }


}
