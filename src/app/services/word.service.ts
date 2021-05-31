import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WordService {
  constructor() {}

  isUnique(word: string): boolean {
    console.log("realIsUnic");
    return;
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
