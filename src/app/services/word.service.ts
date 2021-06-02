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

  addWordToMainList(word: string) { // addWordToMainList
    let mainList: Array<string> =[];
    let mainListFromLocalStorage: string = localStorage.getItem("mainList");

    if (mainListFromLocalStorage) {
      mainList=JSON.parse(mainListFromLocalStorage);
    } 

    mainList.push(word);
    localStorage.setItem("mainList", JSON.stringify(mainList));
  }

  addWordToCurrentList(word: Word) {
    let currentList: Array<Word>=[];
    let currentListFromStorage: string = localStorage.getItem("currentList");

    if (currentListFromStorage) {
      currentList = JSON.parse(currentListFromStorage);
    }

    currentList.push(word);
    localStorage.setItem("currentList", JSON.stringify(currentList));
  }

  getWord(): Word {
    console.log("realagetWord");
    return { name: "словечко", checked: 0 };
  }
}
