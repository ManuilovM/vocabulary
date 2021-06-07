import { TestBed } from "@angular/core/testing";
import { Word } from "../classes/word-obj";

import { WordService } from "./word.service";

describe("WordService", () => {
  let service: WordService;

  

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
    service.fillListNameProperties("EnRu");
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("isUnique(word)", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("При отсутсвии в localStorage свойства wordStorge должна возвращать true", () => {
      expect(service.isUnique("слово")).toEqual(true);
    });

    it("При не существовании искомого слова в localStorage.mainList должна возввращать true", () => {
      let mainListInJSON = JSON.stringify(["слово"]);
      localStorage.setItem(service.mainListName, mainListInJSON);
      expect(service.isUnique("Уникальное слово")).toEqual(true);
    });

    it("При существовании искомого слова в localStorage.mainList должна возввращать false", () => {
      let mainListInJSON = JSON.stringify(["слово"]);
      localStorage.setItem(service.mainListName, mainListInJSON);
      expect(service.isUnique("слово")).toEqual(false);
    });
  });

  describe("addWordToMainList(word)", () => {
    describe("При отсутсвии localStorage.mainList до вызова функции", () => {
      let mainList: Array<string>;

      beforeEach(() => {
        localStorage.clear();
        service.addWordToMainList("слово");
        mainList = JSON.parse(localStorage.getItem(service.mainListName));
      });

      it("Должна добывить слово из аргумента в localStorage.mainList", () => {
        expect(mainList.indexOf("слово") !== -1).toEqual(true);
      });

      it("Количество елементов должно увеличится на 1", () => {
        expect(mainList.length).toEqual(1);
      });
    });

    describe("При существовании некого списка в localStorage.mainList до вызова функции", () => {
      let mainList: Array<string>;

      beforeEach(() => {
        localStorage.clear();
        let mainListInJSON: string = JSON.stringify([
          "Существующий",
          "список",
          "слов",
        ]);
        localStorage.setItem(service.mainListName, mainListInJSON);
        service.addWordToMainList("слово");
        mainList = JSON.parse(localStorage.getItem(service.mainListName));
      });

      it("Должна добывить слово из аргумента в localStorage.mainList", () => {
        expect(mainList.indexOf("слово") !== -1).toEqual(true);
      });

      it("Количество елементов должно увеличится на один", () => {
        expect(mainList.length).toEqual(4);
      });
    });
  });

  describe("addWordToCurrentList(word)", () => {
    describe("При отсутсвии localStorage.currentList до вызова функции", () => {
      let currentList: Array<Word>;

      beforeEach(() => {
        localStorage.clear();
        service.addWordToCurrentList({ name: "слово", checkedTimes: 0 });
        currentList = JSON.parse(localStorage.getItem(service.currentListName));
      });

      it("Должна добывить слово из аргумента в localStorage.currentList", () => {
        let result: boolean = currentList.some((item) => {
          return item.name === "слово" && item.checkedTimes === 0;
        });
        expect(result).toEqual(true);
      });

      it("Количество елементов должно увеличится на один", () => {
        expect(currentList.length).toEqual(1);
      });
    });

    describe("При существовании некого списка в localStorage.currentList до вызова функции", () => {
      let currentList: Array<Word>;

      beforeEach(() => {
        localStorage.clear();
        let currentListInJSON: string = JSON.stringify([
          { name: "Случайный", checkedTimes: 0 },
          { name: "список", checkedTimes: 0 },
          { name: "слов", checkedTimes: 0 },
        ]);
        localStorage.setItem(service.currentListName, currentListInJSON);
        service.addWordToCurrentList({ name: "слово", checkedTimes: 0 });
        currentList = JSON.parse(localStorage.getItem(service.currentListName));
      });

      it("Должна добывить слово из аргумента в localStorage.currentList", () => {
        let result: boolean = currentList.some((item) => {
          return item.name === "слово" && item.checkedTimes === 0;
        });
        expect(result).toEqual(true);
      });

      it("Количество елементов должно увеличится на один", () => {
        expect(currentList.length).toEqual(4);
      });
    });
  });

  describe("addWordToCheckedList(word)", () => {
    describe("При отсутсвии localStorage.checkedList до вызова функции", () => {
      let checkedList: Array<Word>;

      beforeEach(() => {
        localStorage.clear();
        service.addWordToCheckedList({ name: "слово", checkedTimes: 0 });
        checkedList = JSON.parse(localStorage.getItem(service.checkedListName));
      });

      it("Должна добывить слово из аргумента в localStorage.checkedList", () => {
        let result: boolean = checkedList.some((item) => {
          return item.name === "слово" && item.checkedTimes === 0;
        });
        expect(result).toEqual(true);
      });

      it("Количество елементов должно увеличится на один", () => {
        expect(checkedList.length).toEqual(1);
      });
    });

    describe("При существовании некого списка в localStorage.checkedList до вызова функции", () => {
      let checkedList: Array<Word>;

      beforeEach(() => {
        localStorage.clear();
        let checkedListInJSON: string = JSON.stringify([
          { name: "Случайный", checkedList: 0 },
          { name: "список", checkedList: 0 },
          { name: "слов", checkedList: 0 },
        ]);
        localStorage.setItem(service.checkedListName, checkedListInJSON);
        service.addWordToCheckedList({ name: "слово", checkedTimes: 0 });
        checkedList = JSON.parse(localStorage.getItem(service.checkedListName));
      });

      it("Должна добывить слово из аргумента в localStorage.checkedList", () => {
        let result: boolean = checkedList.some((item) => {
          return item.name === "слово" && item.checkedTimes === 0;
        });
        expect(result).toEqual(true);
      });

      it("Количество елементов должно увеличится на один", () => {
        expect(checkedList.length).toEqual(4);
      });
    });
  });

  describe("deleteWordFromMainList", () => {
    describe("При localStorage.mainList.legth =1", () => {
      beforeEach(() => {
        localStorage.clear();
        localStorage.setItem(service.mainListName, JSON.stringify(["word"]));
      });

      it("Должна удалять указанное слово из localStorage.mainList", () => {
        service.deleteWordFromMainList("word");
              expect(
          JSON.parse(localStorage.getItem(service.mainListName)).indexOf("word") == -1
        ).toBeTrue();
      });
    });

    describe("При localStorage.mainList.legth =2", () => {
      beforeEach(() => {
        localStorage.clear();
        localStorage.setItem(service.mainListName, JSON.stringify(["word", "secondWord"]));
      });

      it("Должна удалять указанное слово из localStorage.mainList", () => {
        service.deleteWordFromMainList("word");
        expect(
          JSON.parse(localStorage.getItem(service.mainListName)).indexOf("word") == -1
        ).toBeTrue();
      });
    });
  });

  describe("takeWordsFromCheckedList", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("Должна возвращать ложное значение если нет localStorage.checkedList", () => {
      expect(service.takeWordsFromCheckedList()).toBeFalsy();
    });

    it("Должна возвращать ложное значение если в localStorage.checkedList пустой массив", () => {
      localStorage.setItem(service.checkedListName, JSON.stringify([]));
      expect(service.takeWordsFromCheckedList()).toBeFalsy();
    });

    describe("При не пустом localStorage.checkedList", () => {
      let todayStr: string = new Date().toDateString();
      let oldDateStr: string = new Date(0).toDateString();
      beforeEach(() => {
        localStorage.clear();
        localStorage.setItem(
          service.checkedListName,
          JSON.stringify([
            { name: "newCheckedWord", checkedTimes: 1, lastCheck: todayStr },
            { name: "newCheckedWord2", checkedTimes: 1, lastCheck: todayStr },
            { name: "oldCheckedWord", checkedTimes: 1, lastCheck: oldDateStr },
            { name: "oldCheckedWord2", checkedTimes: 1, lastCheck: oldDateStr },
            { name: "oldCheckedWord3", checkedTimes: 1, lastCheck: oldDateStr },
          ])
        );
      });

      it("Должна возвращать список слов провереных вчера и раннее", () => {
        expect(service.takeWordsFromCheckedList().length).toEqual(3);
      });

      it("Должна записывать обратно в localStorage список слов провереных сегодя", () => {
        service.takeWordsFromCheckedList();
        expect(JSON.parse(localStorage.getItem(service.checkedListName)).length).toEqual(
          2
        );
      });
    });
  });

  describe("isCurrentListAndHasItems", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("При localStorage.currentList = undefined должна возвращать false ", () => {
      expect(service.isCurrentListAndHasItems()).toBeFalse();
    });

    it("При localStorage.currentList = [] должна возвращать false ", () => {
      localStorage.setItem(service.currentListName, JSON.stringify([]));
      expect(service.isCurrentListAndHasItems()).toBeFalse();
    });

    it("При localStorage.curentList = [{name: 'name', checkedTimes: 0}]", () => {
      localStorage.setItem(
        service.currentListName,
        JSON.stringify([{ name: "name", checkedTimes: 0 }])
      );
      expect(service.isCurrentListAndHasItems()).toBeTrue();
    });
  });

  describe("isCheckedListAndHasItems", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("При localStorage.checkedList = undefined должна возвращать false ", () => {
      expect(service.isCheckedListAndHasItems()).toBeFalse();
    });

    it("При localStorage.checkedList = [] должна возвращать false ", () => {
      localStorage.setItem(service.checkedListName, JSON.stringify([]));
      expect(service.isCheckedListAndHasItems()).toBeFalse();
    });

    it("При localStorage.checkedList = [{name: 'name', checkedTimes: 0, lastCheck: 'today'}] должна возвращать true", () => {
      localStorage.setItem(
        service.checkedListName,
        JSON.stringify([{ name: "name", checkedTimes: 0, lastCheck: "today" }])
      );
      expect(service.isCheckedListAndHasItems()).toBeTrue();
    });
  });

  describe("takeWord", () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it("При localStorage.isCheckedListTakenToday = true;  isCurrentListAndHasItems = false Должна авернуть ложное значение", () => {
      localStorage.setItem(service.isCheckedListTakenTodayName, JSON.stringify(true));
      spyOn(service, "isCurrentListAndHasItems").and.returnValue(false);
      expect(service.takeWord()).toBeFalsy();
    });

    describe("При localStorage.isCheckedListTakenToday = false; isCurrentListAndHasItems = false; service.TakeWordsFromCheckedList = null", () => {
      beforeEach(() => {
        localStorage.clear();
        spyOn(service, "isCurrentListAndHasItems").and.returnValue(false);
        spyOn(service, "takeWordsFromCheckedList").and.returnValue(null);
      });

      it(" Должна вернуть ложное значение", () => {
        expect(service.takeWord()).toBeFalsy();
      });

      it(" должна поменять localStorage.isCheckedListTakenToday с false на true;", () => {
        service.takeWord();
        expect(
          JSON.parse(localStorage.getItem(service.isCheckedListTakenTodayName))
        ).toBeTrue();
      });
    });

    describe("При localStorage.currentList =[{name: 'слово', checkedTimes:0}], service.TakeWordsFromCheckedList = null", () => {
      beforeEach(() => {
        localStorage.clear();
        spyOn(service, "isCurrentListAndHasItems").and.returnValue(true);
        spyOn(service, "takeWordsFromCheckedList").and.returnValue(null);
        localStorage.setItem(
          service.currentListName,
          JSON.stringify([{ name: "слово", checkedTimes: 0 }])
        );
      });

      it("Должна вернуть {name: 'слово', checkedTimes:0}", () => {
        let word: Word = service.takeWord();
        let result: boolean = word.name == "слово" && word.checkedTimes == 0;
        expect(result).toBeTrue();
      });

      it("localStorage.currentList.length должен быть равен 0", () => {
        service.takeWord();
        expect(JSON.parse(localStorage.getItem(service.currentListName)).length).toEqual(
          0
        );
      });
    });

    describe("При localStorage.currentList =[{name: 'слово', checkedTimes:0}, {name: 'слово1', checkedTimes:0}],service.TakeWordsFromCheckedList = null", () => {
      beforeEach(() => {
        localStorage.clear();
        spyOn(service, "isCurrentListAndHasItems").and.returnValue(true);
        spyOn(service, "takeWordsFromCheckedList").and.returnValue(null);
        localStorage.setItem(
          service.currentListName,
          JSON.stringify([
            { name: "слово", checkedTimes: 0 },
            { name: "слово1", checkedTimes: 0 },
          ])
        );
      });

      it("Должна вернуть экземпляр Word", () => {
        let word: Word = service.takeWord();
        let result: boolean = word.checkedTimes == 0;
        expect(result).toBeTrue();
      });

      it("localStorage.currentList.length должен быть равен 1", () => {
        service.takeWord();
        expect(JSON.parse(localStorage.getItem(service.currentListName)).length).toEqual(
          1
        );
      });
    });

    describe("При localStorage.currentList =[{name: 'слово', checkedTimes:0}],service.TakeWordsFromCheckedList = [{name: 'слово2', checked:0}]", () => {
      beforeEach(() => {
        localStorage.clear();
        spyOn(service, "isCurrentListAndHasItems").and.returnValue(true);
        spyOn(service, "takeWordsFromCheckedList").and.returnValue([
          { name: "слово2", checkedTimes: 0 },
        ]);
        localStorage.setItem(
          service.currentListName,
          JSON.stringify([{ name: "слово", checkedTimes: 0 }])
        );
      });

      it("Должна вернуть экземпляр Word", () => {
        let word: Word = service.takeWord();
        let result: boolean = word.checkedTimes == 0;
        expect(result).toBeTrue();
      });

      it("localStorage.currentList.length должен быть равен 1", () => {
        service.takeWord();
        expect(JSON.parse(localStorage.getItem(service.currentListName)).length).toEqual(
          1
        );
      });
    });
    describe("При localStorage.currentList  = falsy,service.TakeWordsFromCheckedList = [{name: 'слово2', checkedTimes:0}]", () => {
      beforeEach(() => {
        localStorage.clear();
        spyOn(service, "isCurrentListAndHasItems").and.returnValue(false);
        spyOn(service, "takeWordsFromCheckedList").and.returnValue([
          { name: "слово2", checkedTimes: 0 },
        ]);
      });

      it("Должна вернуть экземпляр Word", () => {
        let word: Word = service.takeWord();
        let result: boolean = word.checkedTimes == 0;
        expect(result).toBeTrue();
      });

      it("localStorage.currentList.length должен быть равен 0", () => {
        service.takeWord();
        expect(JSON.parse(localStorage.getItem(service.currentListName)).length).toEqual(
          0
        );
      });
    });
  });

  describe("fillListNameProperties",()=>{
    beforeEach(()=>{
      service.fillListNameProperties("/KUKU");
    })

    it("currentListName долженбыть равен '/KUKUCurrentList'",()=>{
      expect(service.currentListName).toEqual('/KUKUCurrentList')
    })

    it("maintListName долженбыть равен '/KUKUMainList'",()=>{
      expect(service.mainListName).toEqual('/KUKUMainList')
    })

    it("checkedListName долженбыть равен '/KUKUCheckedList'",()=>{
      expect(service.checkedListName).toEqual('/KUKUCheckedList')
    })

    it("isCheckedLisTakenListName долженбыть равен '/KUKUCheckedList'",()=>{
      expect(service.checkedListName).toEqual('/KUKUCheckedList')
    })
  })
});
