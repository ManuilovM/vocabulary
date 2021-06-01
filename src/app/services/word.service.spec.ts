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
  

});
