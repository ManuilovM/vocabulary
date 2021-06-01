import { TestBed } from "@angular/core/testing";

import { WordService } from "./word.service";

describe("WordService", () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isUnique(word)",()=>{
    beforeEach(()=>{
      localStorage.clear();
    })

    it("При отсутсвии в localStorage свойства wordStorge должна возвращать true", ()=>{
      expect(service.isUnique("cлово")).toEqual(true);
    })

    it("При не существовании искомого слова в localStorage.wordStorage должна возввращать true", ()=>{
      let wordStorageInJSON = JSON.stringify(["слово"]);
      localStorage.setItem("wordStorage", wordStorageInJSON);
      expect(service.isUnique("Уникальное слово")).toEqual(true);
    })

    it("При существовании искомого слова в localStorage.wordStorage должна возввращать false", ()=>{
      let wordStorageInJSON = JSON.stringify(["слово"]);
      localStorage.setItem("wordStorage", wordStorageInJSON);
      expect(service.isUnique("слово")).toEqual(false);
    })
  })

  describe("addWordStrToWordStorage(wordStr)",()=>{
    beforeEach(()=>{
      localStorage.clear();
    })

    describe("При отсутсвии localStorage.wordStorage до вызова функции", ()=>{
      it("Должна добывить слово из аргумента в localStorage.wordStorage",()=>{
        service.addWordStrToWordStorage("слово");
        let wordStorage:Array<string> = JSON.parse(localStorage.getItem("wordStorage"));
        expect(wordStorage.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на 1", ()=>{
        service.addWordStrToWordStorage("слово");
        let wordStorage:Array<string> = JSON.parse(localStorage.getItem("wordStorage"));
        expect(wordStorage.length).toEqual(1);
      })
    })

    describe("При существовании некого списка в localStorage.wordStorage до вызова функции", ()=>{
      beforeEach(()=>{
        let wordStorageInJSON:string = JSON.stringify(["Существующий", "список", "слов"]);
        localStorage.setItem("wordStorage", wordStorageInJSON);
      })

      it("Должна добывить слово из аргумента в localStorage.wordStorage",()=>{
        service.addWordStrToWordStorage("слово");
        let wordStorage:Array<string> = JSON.parse(localStorage.getItem("wordStorage"));
        expect(wordStorage.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на 1", ()=>{
        service.addWordStrToWordStorage("слово");
        let wordStorage:Array<string> = JSON.parse(localStorage.getItem("wordStorage"));
        expect(wordStorage.length).toEqual(4);
      })
    })

  })
  

});
