import { Injectable } from "@angular/core";
import { Word } from "../classes/word-obj";

@Injectable({
  providedIn: "root",
})
export class WordService {
  constructor() {}

  isUnique(word: string): boolean {
    let wordStorageInJSON: string = localStorage.getItem("wordStorage");
    if (!wordStorageInJSON) return true;
    let wordStorage: Array<string> = JSON.parse(wordStorageInJSON);
    if (wordStorage.indexOf(word) === -1) return true;
    else return false;
  }

  addWordStrToWordStorage(word: string) {
    let wordStorage: Array<string> =[];
    let wordStorageFromStorage: string = localStorage.getItem("wordStorage");

    if (wordStorageFromStorage) {
      wordStorage=JSON.parse(wordStorageFromStorage);
    } 

    wordStorage.push(word);
    localStorage.setItem("wordStorage", JSON.stringify(wordStorage));
  }

  addWordObjToCurentList(word: Word) {
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
