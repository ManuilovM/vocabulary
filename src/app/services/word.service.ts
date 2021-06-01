import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WordService {
  constructor() {}

  isUnique(word: string): boolean {
    
    let wordStorageInJSON :string= localStorage.getItem("wordStorage");
    if(!wordStorageInJSON) return true;
    let wordStorage: Array<string> = JSON.parse(wordStorageInJSON);
    if(wordStorage.indexOf(word)===-1) return true;
    else return false
  }

  addWordStrToWordStorage(wordStr){
    console.log("realaddWordStrToWordStorage");
  }
  addWordObjToCurentList(wordObj){
    console.log("realaddWordObjToCurentList");
  }
  getWord():string{
    console.log("realagetWord")
    return;
  }
}
