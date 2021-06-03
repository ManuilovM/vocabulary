import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { WordService } from "src/app/services/word.service";

import { TrainingComponent } from "./training.component";

describe("TrainingComponent", () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  const FakeWordServise = jasmine.createSpyObj("wordServise", [
    "getWord",
    "isUnique",
    "addWordToMainList",
    "addWordToCurrentList",
    "isCurrentList",
    "isCheckedList",
  ]);

  let fakeFillWordProperties;

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

    it("Должено быть свойство wordFormControl", () => {
      expect(component.wordFormControl).toBeTruthy();
    });

    it("Должно быть свойство message", () => {
      component.message = "Сообщение";
      expect(component.message).toBeTruthy();
    });

    it("Должно быть свойство wordInstance",()=>{
      component.wordInstance= {name: "word1", checked:0}
      expect(component.wordInstance).toBeTruthy();
    })
  });

  /* ------------------------------ AlertMessage ----------------------------- */
  describe("alertMessage",()=>{
    describe("showAlertMessage(msg)", () => {
      it("Должна менять свойство message на msg из аргумента", () => {
        component.message = "";
        fixture.detectChanges();
        component.showAlertMessage("Сообщение1");
        expect(component.message).toEqual("Сообщение1");
      });
    });
  
    describe("closeAlertMessage()", () => {
      it("Должна присваевать свойству message пустую строку", () => {
        component.message = "Сообщение2";
        fixture.detectChanges();
        component.closeAlertMessage(component);
        expect(component.message).toEqual("");
      });
    });
  
    describe(".alertMessage *ngIf='message'", () => {
      it("При свойстве message = 'Проблема' должен быть виден элемент .alertMessage", () => {
        component.message = "Проблема";
        fixture.detectChanges();
        const alertMessage = fixture.debugElement.nativeElement.querySelector(
          ".alertMessage"
        );
        expect(alertMessage).toBeTruthy();
      });
  
      it("При свойстве message = '' НЕ должен быть виден элемент .alertMessage", () => {
        component.message = "";
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
      it("Должна вызваться функция showAlertMessage c аргументом 'Введите слово!'", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).toHaveBeenCalledWith(
          "Введите слово!"
        );
      });

      it("Не должна вызваться функция wordService.isUnique", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.isUnique.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.isUnique).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToMainList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToMainList.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToMainList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToCurrentList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToCurrentList.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToCurrentList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция component.fillWordProperties", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        fakeFillWordProperties.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(fakeFillWordProperties).not.toHaveBeenCalled();
      });
    });

    describe("При isUnique()=false", () => {
      it("Должна вызваться функция showAlertMessage c аргументом 'Это слово уже добавлено!'", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).toHaveBeenCalledWith(
          "Это слово уже добавлено!"
        );
      });

      it("Не должна вызываться функция wordService.addWordToMainList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToMainList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToMainList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция wordService.addWordToCurrentList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToCurrentList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToCurrentList).not.toHaveBeenCalled();
      });

      it("Не должна вызываться функция component.fillWordProperties", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        fakeFillWordProperties.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(fakeFillWordProperties).not.toHaveBeenCalled();
      });
    });

    describe("при isUnique()=true", () => {
      it("Не должна вызываться функция showAlertMessage", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).not.toHaveBeenCalled();
      });

      it("Должна вызываться функция wordService.addWordToMainList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToMainList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToMainList).toHaveBeenCalled();
      });

      it("Должна вызываться функция wordService.addWordToCurrentList", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        FakeWordServise.addWordToCurrentList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordToCurrentList).toHaveBeenCalled();
      });

      it("Должна вызываться функция component.fillWordProperties", () => {
        spyOn(component, "showAlertMessage").and.callFake((msg) => {});
        component.wordFormControl.setValue("word");
        fakeFillWordProperties.calls.reset();
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(fakeFillWordProperties).toHaveBeenCalled();
      });
    });
  });

  /* ---------------------------- fillPropertyWord ---------------------------- */

  describe("fillWordProperty", () => {
    it("При isCurrentList=false и isCheckedListfalse ДОЛЖНО быть Component.wordName = 'В хранилище нет слов...' ",
      () => {
      FakeWordServise.isCurrentList.and.returnValue(false);
      FakeWordServise.isCheckedList.and.returnValue(false);
      fakeFillWordProperties.and.callThrough();
      component.wordName = "";
      fixture.detectChanges();
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        "В хранилище нет слов. Добавте слова чтобы начать тренировку"
      );
    });

    it( "При isCurrentList=true и getWord() = underfined ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
      FakeWordServise.isCurrentList.and.returnValue(true);
      FakeWordServise.getWord.and.returnValue(undefined);
      fakeFillWordProperties.and.callThrough();
      component.wordName = "";
      fixture.detectChanges();
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        "Вы повторили все слова. Подождите день чтобы повторить эти слова снова или добавте новые"
      );
    });


    it( "При isCurrentList=true и getWord() = {name: 'слово', checked: 0} ДОЛЖНО быть Component.wordName = 'Вы повторили все слова...' ", 
      () => {
      FakeWordServise.isCurrentList.and.returnValue(true);
      FakeWordServise.getWord.and.returnValue({name: 'слово', checked: 0});
      fakeFillWordProperties.and.callThrough();
      component.wordName = "";
      fixture.detectChanges();
      component.fillWordProperties();
      expect(component.wordName).toEqual(
        'слово'
      );
    });

  });
});
