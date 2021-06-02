import { TestBed } from "@angular/core/testing";
import { Word } from "../classes/word-obj";

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

    it("При не существовании искомого слова в localStorage.mainList должна возввращать true", ()=>{
      let mainListInJSON = JSON.stringify(["слово"]);
      localStorage.setItem("mainList", mainListInJSON);
      expect(service.isUnique("Уникальное слово")).toEqual(true);
    })

    it("При существовании искомого слова в localStorage.mainList должна возввращать false", ()=>{
      let mainListInJSON = JSON.stringify(["слово"]);
      localStorage.setItem("mainList", mainListInJSON);
      expect(service.isUnique("слово")).toEqual(false);
    })
  }) 

  describe("addWorToMainList(word)",()=>{
    describe("При отсутсвии localStorage.mainList до вызова функции", ()=>{
      beforeEach(()=>{
        localStorage.clear();
      })

      it("Должна добывить слово из аргумента в localStorage.mainList",()=>{
        service.addWordToMainList("слово");
        let mainList:Array<string> = JSON.parse(localStorage.getItem("mainList"));
        expect(mainList.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на 1", ()=>{
        service.addWordToMainList("слово");
        let mainList:Array<string> = JSON.parse(localStorage.getItem("mainList"));
        expect(mainList.length).toEqual(1);
      })
    })

    describe("При существовании некого списка в localStorage.mainList до вызова функции", ()=>{
      beforeEach(()=>{
        localStorage.clear();
        let mainListInJSON:string = JSON.stringify(["Существующий", "список", "слов"]);
        localStorage.setItem("mainList", mainListInJSON);
      })

      it("Должна добывить слово из аргумента в localStorage.mainList",()=>{
        service.addWordToMainList("слово");
        let mainList:Array<string> = JSON.parse(localStorage.getItem("mainList"));
        expect(mainList.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на один", ()=>{
        service.addWordToMainList("слово");
        let mainList:Array<string> = JSON.parse(localStorage.getItem("mainList"));
        expect(mainList.length).toEqual(4);
      })
    })

  })

  describe("addWordToCurrentList(word)",()=>{
    describe("При отсутсвии localStorage.currentList до вызова функции", ()=>{
      beforeEach(()=>{
        localStorage.clear();
      })

      it("Должна добывить слово из аргумента в localStorage.currentList",()=>{
        service.addWordToCurrentList({name: "слово", checked:0});
        let currentList :Array<Word> = JSON.parse(localStorage.getItem("currentList"));
        let result= currentList.some((item)=>{
          return item.name ==="слово"&& item.checked ===0;
        })
        expect(result).toEqual(true);
      })

      it("Количество елементов должно увеличится на один", ()=>{
        service.addWordToCurrentList({name: "слово", checked:0});
        let currentList :Array<Word> = JSON.parse(localStorage.getItem("currentList"));
        expect(currentList.length).toEqual(1);
      })
    })

    describe("При существовании некого списка в localStorage.currentList до вызова функции", ()=>{
      beforeEach(()=>{
        localStorage.clear();
        let currentListInJSON:string = JSON.stringify([{name: "Случайный", checked:0}, {name: "список", checked:0}, {name: "слов", checked:0}]);
        localStorage.setItem("currentList", currentListInJSON);
      })

      it("Должна добывить слово из аргумента в localStorage.currentList",()=>{
        service.addWordToCurrentList({name: "слово", checked:0});
        let currentList:Array<Word> = JSON.parse(localStorage.getItem("currentList"));
        let result= currentList.some((item)=>{
          return item.name ==="слово"&& item.checked ===0;
        })
        expect(result).toEqual(true);
      })
      

      it("Количество елементов должно увеличится на один", ()=>{
        service.addWordToCurrentList({name: "слово", checked:0});
        let currentList :Array<Word> = JSON.parse(localStorage.getItem("currentList"));
        expect(currentList.length).toEqual(4);
      })
    })

  })
  

});
