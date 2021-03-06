import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Word } from "src/app/classes/word-obj";
import { WordService } from "src/app/services/word.service";

import { TrainingComponent } from "./training.component";

describe("TrainingComponent", () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  const FakeWordServise = jasmine.createSpyObj("wordServise", [
    "takeWord",
    "isUnique",
    "addWordToMainList",
    "addWordToCurrentList",
    "addWordToCheckedList",
    "deleteWordFromMainList",
    "isCurrentListAndHasItems",
    "isCheckedListAndHasItems",
    "takeWordFromCheckedList",
    "fillListNameProperties"
  ]);

  let fakeFillWordProperties;

  let fakeShowAlertMessage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TrainingComponent],
      providers: [{ provide: WordService, useValue: FakeWordServise }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fakeFillWordProperties = spyOn(
      component,
      "fillWordProperties"
    ).and.callFake(() => {});
    fakeShowAlertMessage  = spyOn(
      component,
      "showAlertMessage"
    ).and.callFake(() => {});
    fixture.detectChanges();
  });

  /* ------------------------------- properties ------------------------------- */
  describe("main", () => {
    it("should create", () => {
      expect(component).toBeTruthy();
    });
    
    it("Должено быть свойство wordInstanceName", () => {
      component.wordInstanceName= "слово";
      fixture.detectChanges();
      expect(component.wordInstanceName).toBeTruthy();
    });


    it("Должено быть свойство wordName", () => {
      component.wordName = "слово";
      fixture.detectChanges();
      expect(component.wordName).toBeTruthy();
    });

    it("Должно отображатьсяь свойство wordName в шаблоне",()=>{
      component.wordName = "Словечко";
      const wordName = fixture.debugElement.nativeElement.querySelector(
        ".word"
      ); 
      fixture.detectChanges();
      expect(wordName.textContent).toEqual("Словечко");
    })

    it("Должено быть свойство wordFormControl", () => {
      expect(component.wordFormControl).toBeTruthy();
    });

    it("Должна быть связь между wordFormControl.value .input.value",()=>{
      let input = fixture.debugElement.nativeElement.querySelector(
        ".input"
      ); 
      component.wordFormControl.setValue("foo");
      fixture.detectChanges();
      expect(input.value).toEqual("foo");
    })

    it("Должно быть свойство alertMessage", () => {
      component.alertMessage = "Сообщение";
      fixture.detectChanges();
      expect(component.alertMessage).toBeTruthy();
    });

    it("Должно быть свойство wordInstance",()=>{
      component.wordInstance= {name: "word1", checkedTimes:0}
      fixture.detectChanges();
      expect(component.wordInstance).toBeTruthy();
    })
  });

  /* ------------------------------ AlertMessage ----------------------------- */
  describe("alertMessage",()=>{
    describe("showAlertMessage(msg)", () => {
      it("Должна менять свойство alertMessage на msg из аргумента", () => {
        fakeShowAlertMessage.and.callThrough();
        component.alertMessage = "";
        component.showAlertMessage("Сообщение1");
        fixture.detectChanges();
        expect(component.alertMessage).toEqual("Сообщение1");
      });
    });
  
    describe("closeAlertMessage()", () => {
      it("Должна присваевать свойству alertMessage пустую строку", () => {
        fixture.detectChanges();
        component.alertMessage = "Сообщение2";
        fixture.detectChanges();
        component.closeAlertMessage(component);
        expect(component.alertMessage).toEqual("");
      });
    });
  
    describe(".alertMessage *ngIf='message'", () => {
      beforeEach(()=>{
        fakeShowAlertMessage.and.callThrough();
      })
      it("При свойстве message = 'Проблема' должен быть виден элемент .alertMessage", () => {
        component.alertMessage = "Проблема";
        fixture.detectChanges();
        const alertMessage = fixture.debugElement.nativeElement.querySelector(
          ".alertMessage"
        );
        expect(alertMessage).toBeTruthy();
      });
  
      it("При свойстве message = '' НЕ должен быть виден элемент .alertMessage", () => {
        component.alertMessage = "";
        fixture.detectChanges();
        const alertMessage = fixture.debugElement.nativeElement.querySelector(
          ".alertMessage"
        );
        expect(alertMessage).toBeFalsy();
      });
    });

  })


  /* --------------------------- onAddWordButtonClick() --------------------------- */

  describe("onAddWordButtonClick", () => {
    it("При клике на .addWorButton должна вызваться функция onAddButtonClick", () => {
      spyOn(component, "onAddWordButtonClick").and.callFake(() => {});
      let button = fixture.debugElement.nativeElement.querySelector(
        ".addWordButton"
      );
      button.click();
      fixture.detectChanges();
      expect(component.onAddWordButtonClick).toHaveBeenCalled();
    });

    describe("При wordFormControl.value =' '", () => {
      beforeEach(()=>{
        component.wordFormControl.setValue("");
        FakeWordServise.isUnique.calls.reset();
        FakeWordServise.addWordToMainList.calls.reset();
        FakeWordServise.addWordToCurrentList.calls.reset();
        fakeFillWordProperties.calls.reset();
        fixture.detectChanges();
        component.onAddWordButtonClick();
      })

      it("Должна вызваться функция showAlertMessage c аргументом 'Введите слово!'", () => {
        expect(component.showAlertMessage).toHaveBeenCalledWith(
          "Введите слово!"
        );
      });

      it("Не должна вызваться функция wordService.isUnique", () => {
        expect(FakeWordServise.isUnique).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToMainList", () => {
        expect(FakeWordServise.addWordToMainList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToCurrentList", () => {
        expect(FakeWordServise.addWordToCurrentList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция component.fillWordProperties", () => {       
        expect(fakeFillWordProperties).not.toHaveBeenCalled();
      });
    });

    describe("При isUnique()=false", () => {
      beforeEach(()=>{
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        FakeWordServise.addWordToMainList.calls.reset();
        FakeWordServise.addWordToCurrentList.calls.reset();
        fakeFillWordProperties.calls.reset();
        fixture.detectChanges();
        component.onAddWordButtonClick();
      })

      it("Должна вызваться функция showAlertMessage c аргументом 'Это слово уже добавлено!'", () => {
        expect(component.showAlertMessage).toHaveBeenCalledWith(
          "Это слово уже добавлено!"
        );
      });

      it("Не должна вызываться функция wordService.addWordToMainList", () => {
        expect(FakeWordServise.addWordToMainList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToCurrentList", () => {
        expect(FakeWordServise.addWordToCurrentList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция component.fillWordProperties", () => {
        expect(fakeFillWordProperties).not.toHaveBeenCalled();
      });
    });

    describe("при isUnique()=true", () => {
      beforeEach(()=>{
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        FakeWordServise.addWordToMainList.calls.reset();
        FakeWordServise.addWordToCurrentList.calls.reset();
        fakeFillWordProperties.calls.reset();
        fixture.detectChanges();
        component.onAddWordButtonClick();
      })
      it("Не должна вызываться функция showAlertMessage", () => {  
        expect(component.showAlertMessage).not.toHaveBeenCalled();
      });

      it("Должна вызываться функция wordService.addWordToMainList", () => {     
        expect(FakeWordServise.addWordToMainList).toHaveBeenCalled();
      });

      it("Должна вызываться функция wordService.addWordToCurrentList", () => {
        expect(FakeWordServise.addWordToCurrentList).toHaveBeenCalled();
      });

    });
  });

  /* ---------------------------- fillWordProperty ---------------------------- */

  describe("fillWordProperty", () => {
    beforeEach(()=>{
      component.wordInstanceName = "EnRuWordInstance"
      fakeFillWordProperties.and.callThrough();
      component.wordName = "";
      fixture.detectChanges();
    })

    it("При localStorage.wordInstance = {name: 'foo', chackedTimes:0}; component.wordInstance=null; localStorage.currentList=null; localStorage.checkedList=null должна вернуть тот же instance в свойство component.wordInstance",()=>{
      fixture.detectChanges();
      localStorage.clear();
      localStorage.setItem(component.wordInstanceName, JSON.stringify({name: 'foo', chackedTimes:0}));
      component.wordInstance =null;
      component.fillWordProperties();
      fixture.detectChanges();
      let result: boolean= component.wordInstance.name == "foo"; 
      expect(result).toBeTrue();
    })

    it("При isCurrentListAndHasItems=false и isCheckedListAndHasItems = false ДОЛЖНО быть Component.wordName = 'В хранилище нет слов...' ",
      () => {
        fixture.detectChanges();
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(false);
      FakeWordServise.isCheckedListAndHasItems.and.returnValue(false);
      component.fillWordProperties();
      fixture.detectChanges();
      expect(component.wordName).toEqual(
        "В хранилище нет слов. Добавьте слова чтобы начать тренировку"
      );
    });

    it( "При isCurrentListAndHasItems=true и takeWord() = underfined ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
        fixture.detectChanges();
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(true);
      FakeWordServise.takeWord.and.returnValue(undefined);
      component.fillWordProperties();
      fixture.detectChanges();
      expect(component.wordName).toEqual(
        "Вы повторили все слова на сегодня. Подождите день чтобы повторить эти слова снова или добавьте новые"
      );
    });

    it( "При isCurrentListAndHasItems=true и takeWord() = {name: 'слово', checkedTimes: 0} ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
        fixture.detectChanges();
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(true);
      FakeWordServise.takeWord.and.returnValue({name: 'слово', checkedTimes: 0});
      component.fillWordProperties();
      fixture.detectChanges();
      expect(component.wordName).toEqual(
        'слово'
      );
    });
  });

  /* --------------------------- clearWordProperties -------------------------- */

  describe("clearWordProperies",()=>{
    beforeEach(()=>{
      component.wordInstanceName = "RuEnWordInstance"
      component.wordInstance ={name: "ckjdj", checkedTimes: 0};
      component.wordName ="ckjdj";
      fixture.detectChanges();
      localStorage.setItem(component.wordInstanceName, JSON.stringify({name: "ckjdj", chackedTimes:0}));
      component.clearWordProperties();
    })

    it("Должна удалить значение свойства component.wordInstance",()=>{
      expect(component.wordInstance).toBeFalsy();
    })

    it("Должна удалить значение свойства component.wordName",()=>{
      expect(component.wordName).toBeFalsy();
    })

    it("Должна удалить значение из localStorage.wordInstance",()=>{
      expect(localStorage.getItem(component.wordInstanceName)).toBeFalsy();
    })
  })

  /* ---------------------------- onSayYes; onSayNo --------------------------- */

  describe("onSayYes",()=>{
    beforeEach(()=>{
      localStorage.clear();
      fakeFillWordProperties.calls.reset();
      FakeWordServise.deleteWordFromMainList.calls.reset();
      FakeWordServise.addWordToCheckedList.calls.reset();
      spyOn(component, "clearWordProperties").and.callFake(()=>{});
      component.wordInstance = {name:"слово", checkedTimes: 0}
      fixture.detectChanges();
    })

    it("При component.wordInstance = null не должна вызваться функция component.fillWordProperties",()=>{
      component.wordInstance = null;
      fixture.detectChanges();
      component.onSayYes();
      expect(fakeFillWordProperties).not.toHaveBeenCalled();
    })

    it("При нажатии .yes должна вызываться функция onSayYes",()=>{
      spyOn(component, "onSayYes");
      let button = fixture.debugElement.nativeElement.querySelector(".yes");
      button.click();
      fixture.detectChanges();
      expect(component.onSayYes).toHaveBeenCalled();
    })

    it("Должна устанавливать в свойстве component.word.lastCheck сегоднешнюю дату",()=>{
      component.onSayYes();
      fixture.detectChanges();
      expect(component.wordInstance.lastCheck).toEqual(new Date().toDateString());
    })

    it("Должна увеличивать на один войство component.word.checkedTimes",()=>{
      component.onSayYes();
      fixture.detectChanges();
      expect(component.wordInstance.checkedTimes).toEqual(1);
    })

    it("При пятом чеке должна вызываться функция wordService.deleteWordFromMainList",()=>{
      component.wordInstance = {name:"слово", checkedTimes: 4}
      component.onSayYes();
      fixture.detectChanges();
      expect(FakeWordServise.deleteWordFromMainList).toHaveBeenCalled();
    })

    it("Если менее чем пятый чек должна вызываться функция wordService.addWordToCheckedList",()=>{
      component.onSayYes();
      fixture.detectChanges();
      expect(FakeWordServise.addWordToCheckedList).toHaveBeenCalled();
    })

    it("Должна вызываться функция component.fillWordProperties",()=>{
      component.onSayYes();
      fixture.detectChanges();
      expect(fakeFillWordProperties).toHaveBeenCalled();
    })
  })

  describe("onSayNo",()=>{
    beforeEach(()=>{
      localStorage.clear();
      fakeFillWordProperties.calls.reset();
      FakeWordServise.addWordToCurrentList.calls.reset();
      spyOn(component, "clearWordProperties").and.callFake(()=>{});
      component.wordInstance = {name:"слово", checkedTimes: 0}
      fixture.detectChanges();
    })

    it("при component.wordInstance = null не должна вызываться component.fillWordProperties",()=>{
      component.wordInstance =null;
      fixture.detectChanges();
      component.onSayNo();
      expect(fakeFillWordProperties).not.toHaveBeenCalled();
    })

    it("При нажатии .no должна вызываться функция onSayNo",()=>{
      spyOn(component, "onSayNo");
      let button = fixture.debugElement.nativeElement.querySelector(".no");
      button.click();
      fixture.detectChanges();
      expect(component.onSayNo).toHaveBeenCalled();
    })

    it("Должна вызываться функция component.fillWordProperties",()=>{
      component.onSayNo();
      fixture.detectChanges();
      expect(fakeFillWordProperties).toHaveBeenCalled();
    })

  })
});
