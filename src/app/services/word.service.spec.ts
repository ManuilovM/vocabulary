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
      let mainList:Array<string>;

      beforeEach(()=>{
        localStorage.clear();
        service.addWordToMainList("слово");
        mainList= JSON.parse(localStorage.getItem("mainList"));
      })

      it("Должна добывить слово из аргумента в localStorage.mainList",()=>{
        expect(mainList.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на 1", ()=>{
        expect(mainList.length).toEqual(1);
      })
    })

    describe("При существовании некого списка в localStorage.mainList до вызова функции", ()=>{
      let mainList:Array<string>;
      
      beforeEach(()=>{
        localStorage.clear();
        let mainListInJSON:string = JSON.stringify(["Существующий", "список", "слов"]);
        localStorage.setItem("mainList", mainListInJSON);
        service.addWordToMainList("слово");
        mainList= JSON.parse(localStorage.getItem("mainList"));
      })

      it("Должна добывить слово из аргумента в localStorage.mainList",()=>{
        expect(mainList.indexOf("слово")!==-1).toEqual(true);
      })

      it("Количество елементов должно увеличится на один", ()=>{
        expect(mainList.length).toEqual(4);
      })
    })
  })

  describe("addWordToCurrentList(word)",()=>{
    describe("При отсутсвии localStorage.currentList до вызова функции", ()=>{
      let currentList :Array<Word>;

      beforeEach(()=>{
        localStorage.clear();
        service.addWordToCurrentList({name: "слово", checked:0});
        currentList = JSON.parse(localStorage.getItem("currentList"));
      })

      it("Должна добывить слово из аргумента в localStorage.currentList",()=>{
        let result:boolean= currentList.some((item)=>{
          return item.name ==="слово"&& item.checked ===0;
        })
        expect(result).toEqual(true);
      })

      it("Количество елементов должно увеличится на один", ()=>{
        expect(currentList.length).toEqual(1);
      })
    })

    describe("При существовании некого списка в localStorage.currentList до вызова функции", ()=>{
      let currentList:Array<Word>;

      beforeEach(()=>{
        localStorage.clear();
        let currentListInJSON:string = JSON.stringify([{name: "Случайный", checked:0}, {name: "список", checked:0}, {name: "слов", checked:0}]);
        localStorage.setItem("currentList", currentListInJSON);
        service.addWordToCurrentList({name: "слово", checked:0});
        currentList= JSON.parse(localStorage.getItem("currentList"));
      })

      it("Должна добывить слово из аргумента в localStorage.currentList",()=>{
        let result:boolean= currentList.some((item)=>{
          return item.name ==="слово"&& item.checked ===0;
        })
        expect(result).toEqual(true);
      })
      
      it("Количество елементов должно увеличится на один", ()=>{
        expect(currentList.length).toEqual(4);
      })
    })
  })
});
