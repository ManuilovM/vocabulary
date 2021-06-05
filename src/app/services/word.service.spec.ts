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
      expect(service.isUnique("слово")).toEqual(true);
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

  describe("takeWordsFromCheckedList",()=>{
    beforeEach(()=>{
      localStorage.clear();
    })

    it("Должна возвращать ложное значение если нет localStorage.checkedList",()=>{
      expect(service.takeWordsFromCheckedList()).toBeFalsy();
    })

    it("Должна возвращать ложное значение если в localStorage.checkedList пустой массив",()=>{
      localStorage.setItem("checkedList",JSON.stringify([]));
      expect(service.takeWordsFromCheckedList()).toBeFalsy();
    })

    describe("При не пустом localStorage.checkedList",()=>{
      let todayStr: string = new Date().toDateString();
      let oldDateStr:string = new Date(0).toDateString();
      beforeEach(()=>{
        localStorage.clear();
        localStorage.setItem("checkedList", JSON.stringify([
          {name:"newCheckedWord", checked:1, lastCheck:todayStr},
          {name:"newCheckedWord2", checked:1, lastCheck:todayStr},
          {name:"oldCheckedWord", checked:1, lastCheck:oldDateStr},
          {name:"oldCheckedWord2", checked:1, lastCheck:oldDateStr},
          {name:"oldCheckedWord3", checked:1, lastCheck:oldDateStr},
        ]))
      })

      it("Должна возвращать список слов провереных вчера и раннее",()=>{
        expect(service.takeWordsFromCheckedList().length).toEqual(3);
      })

      it("Должна записывать обратно в localStorage список слов провереных сегодя",()=>{
        service.takeWordsFromCheckedList();
        expect( JSON.parse( localStorage.getItem("checkedList") ).length ).toEqual(2);
      })

    })
  })

  describe("isCurrentList",()=>{
    beforeEach(()=>{
      localStorage.clear();
    })

    it("При localStorage.currentList = undefined должна возвращать false ",()=>{
      expect(service.isCurrentList()).toBeFalse();
    })

    it("При localStorage.currentList = [] должна возвращать false ",()=>{
      localStorage.setItem("currentList", JSON.stringify([]));
      expect(service.isCurrentList()).toBeFalse();
    })

    it("При localStorage.curentList = [{name: 'name', checked: 0}]",()=>{
      localStorage.setItem("currentList", JSON.stringify([{name: 'name', checked: 0}]));
      expect(service.isCurrentList()).toBeTrue();
    })
  })

  describe("isCheckedList",()=>{
    beforeEach(()=>{
      localStorage.clear();
    })

    it("При localStorage.checkedList = undefined должна возвращать false ",()=>{
      expect(service.isCheckedList()).toBeFalse();
    })

    it("При localStorage.checkedList = [] должна возвращать false ",()=>{
      localStorage.setItem("checkedList", JSON.stringify([]));
      expect(service.isCheckedList()).toBeFalse();
    })

    it("При localStorage.checkedList = [{name: 'name', checked: 0, lastCheck: 'today'}] должна возвращать true",()=>{
      localStorage.setItem("checkedList", JSON.stringify([{name: 'name', checked: 0, lastCheck: 'today'}]));
      expect(service.isCheckedList()).toBeTrue();
    })
  })


});
