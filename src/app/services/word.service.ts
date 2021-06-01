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

  addWordStrToWordStorage(wordStr:string){
    let newWordStorageInJSON:string;
    let wordStorageInJSON :string= localStorage.getItem("wordStorage");

    if(!wordStorageInJSON) {
     newWordStorageInJSON = JSON.stringify([wordStr]);
    }else{
      let wordStorage: Array<string>= JSON.parse(wordStorageInJSON);
      wordStorage.push(wordStr);
      newWordStorageInJSON = JSON.stringify(wordStorage);
    }
    localStorage.setItem("wordStorage", newWordStorageInJSON);
  }




  addWordObjToCurentList(wordObj){
    console.log("realaddWordObjToCurentList");
  }
  getWord():string{
    console.log("realagetWord")
    return;
  }
}
