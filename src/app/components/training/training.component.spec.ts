import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
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
    "isCurrentListAndHasItems",
    "isCheckedListAndHasItems",
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

    it("Должено быть свойство wordName", () => {
      component.wordName = "слово";
      expect(component.wordName).toBeTruthy();
    });

    it("Должно отображатьсяь свойство wordName в шаблоне",()=>{
      component.wordName = "Словечко";
      fixture.detectChanges();
      const wordName = fixture.debugElement.nativeElement.querySelector(
        ".word"
      ); 
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
      console.dir(component.wordFormControl);
      expect(input.value).toEqual("foo");
    })

    it("Должно быть свойство alertMessage", () => {
      component.alertMessage = "Сообщение";
      expect(component.alertMessage).toBeTruthy();
    });

    it("Должно быть свойство wordInstance",()=>{
      component.wordInstance= {name: "word1", checked:0}
      expect(component.wordInstance).toBeTruthy();
    })
  });

  /* ------------------------------ AlertMessage ----------------------------- */
  describe("alertMessage",()=>{
    describe("showAlertMessage(msg)", () => {
      it("Должна менять свойство alertMessage на msg из аргумента", () => {
        fakeShowAlertMessage.and.callThrough();
        component.alertMessage = "";
        fixture.detectChanges();
        component.showAlertMessage("Сообщение1");
        expect(component.alertMessage).toEqual("Сообщение1");
      });
    });
  
    describe("closeAlertMessage()", () => {
      it("Должна присваевать свойству alertMessage пустую строку", () => {
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

      it("Должна вызываться функция component.fillWordProperties", () => {    
        expect(fakeFillWordProperties).toHaveBeenCalled();
      });
    });
  });

  /* ---------------------------- fillPropertyWord ---------------------------- */

  describe("fillWordProperty", () => {
    beforeEach(()=>{
      fakeFillWordProperties.and.callThrough();
      component.wordName = "";
      fixture.detectChanges();
    })

    it("При isCurrentListAndHasItems=false и isCheckedListAndHasItems = false ДОЛЖНО быть Component.wordName = 'В хранилище нет слов...' ",
      () => {
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(false);
      FakeWordServise.isCheckedListAndHasItems.and.returnValue(false);
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        "В хранилище нет слов. Добавте слова чтобы начать тренировку"
      );
    });

    it( "При isCurrentListAndHasItems=true и takeWord() = underfined ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(true);
      FakeWordServise.takeWord.and.returnValue(undefined);
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        "Вы повторили все слова. Подождите день чтобы повторить эти слова снова или добавте новые"
      );
    });

    it( "При isCurrentListAndHasItems=true и takeWord() = {name: 'слово', checked: 0} ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
      FakeWordServise.isCurrentListAndHasItems.and.returnValue(true);
      FakeWordServise.takeWord.and.returnValue({name: 'слово', checked: 0});
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        'слово'
      );
    });
  });
});
