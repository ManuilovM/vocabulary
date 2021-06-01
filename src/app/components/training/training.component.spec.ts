import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { WordService } from "src/app/services/word.service";

import { TrainingComponent } from "./training.component";

describe("TrainingComponent", () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  const FakeWordServise = jasmine.createSpyObj("wordServise", ["getWord", "isUnique", "addWordStrToWordStorage", "addWordObjToCurentList", "getWord"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TrainingComponent],
      providers:[
        {provide:WordService, useValue: FakeWordServise},
      ],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;

    //WordServiceSpy.getWord.and.callFake(()=>{});

  
    fixture.detectChanges();
  });

  /* ------------------------------- properties ------------------------------- */
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Должено быть свойство word", () => {
    component.word = "слово";
    expect(component.word).toBeTruthy();
  });

  it("Должено быть свойство wordFormControl", () => {
    expect(component.wordFormControl).toBeTruthy();
  });

  it("Должно быть свойство message", () => {
    component.message = "Сообщение";
    expect(component.message).toBeTruthy();
  });

  /* ------------------------------ AlertMessage ----------------------------- */
  
  describe("showAlertMessage(msg)",()=>{
   

    it("Должна менять свойство message на msg из аргумента",()=>{
      component.message="";
      fixture.detectChanges();
      component.showAlertMessage("Сообщение1");
      expect(component.message).toEqual("Сообщение1");
    })
  })

  describe("closeAlertMessage()", ()=>{
    it("Должна присваевать свойству message пустую строку",()=>{
      component.message="Сообщение2";
      fixture.detectChanges();
      component.closeAlertMessage(component);
      expect(component.message).toEqual("")
    })
  })

  describe(".alertMessage *ngIf='message'",()=>{
    it("При свойстве message = 'Проблема' должен быть виден элемент .alertMessage",()=>{
      component.message ='Проблема';
      fixture.detectChanges();
      const alertMessage = fixture.debugElement.nativeElement.querySelector(
        ".alertMessage"
      );
      expect(alertMessage).toBeTruthy();
    })

    it("При свойстве message = '' НЕ должен быть виден элемент .alertMessage",()=>{
      component.message ='';
      fixture.detectChanges();
      const alertMessage = fixture.debugElement.nativeElement.querySelector(
        ".alertMessage"
      );
      expect(alertMessage).toBeFalsy();
    })
  })

  /* --------------------------- onAddWordButtonClick() --------------------------- */

  describe("onAddWordButtonClick",()=>{
    it("При клике на .addWorButton должна вызваться функция onAddButtonClick",()=>{
      spyOn(component, "onAddWordButtonClick").and.callFake(()=>{});;
      let button = fixture.debugElement.nativeElement.querySelector('.addWordButton');
      button.click();
      expect(component.onAddWordButtonClick).toHaveBeenCalled();
    })
    
    describe("При wordFormControl.value =' '",()=>{
      it("Должна вызваться функция showAlertMessage c аргументом 'Введите слово!'",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).toHaveBeenCalledWith('Введите слово!');
      })

      it("Не должна вызваться функция wordService.isUnique",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.isUnique.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.isUnique).not.toHaveBeenCalled();
      })

      it("Не должна вызываться функция wordService.addWordStrToWordStorage",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordStrToWordStorage.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordStrToWordStorage).not.toHaveBeenCalled();
      })

      it("Не должна вызываться функция wordService.addWordObjToCurentList",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordObjToCurentList.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordObjToCurentList).not.toHaveBeenCalled();
      })

      it("Не должна вызываться функция wordService.getWord",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.getWord.calls.reset();
        component.wordFormControl.setValue("");
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.getWord).not.toHaveBeenCalled();
      })
     
    })

    describe("При isUnique()=false",()=>{

      it("Должна вызваться функция showAlertMessage c аргументом 'Это слово уже добавлено!'",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).toHaveBeenCalledWith('Это слово уже добавлено!');
      })

      it("Не должна вызываться функция wordService.addWordStrToWordStorage",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordStrToWordStorage.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordStrToWordStorage).not.toHaveBeenCalled();
      })

      it("Не должна вызываться функция wordService.addWordObjToCurentList",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordObjToCurentList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordObjToCurentList).not.toHaveBeenCalled();
      })

      it("Не должна вызываться функция wordService.getWord",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.getWord.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(false);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.getWord).not.toHaveBeenCalled();
      })

    })
    
    describe("при isUnique()=true",()=>{
      it("Не должна вызываться функция showAlertMessage", ()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(component.showAlertMessage).not.toHaveBeenCalled();
      })

      it("Должна вызываться функция wordService.addWordStrToWordStorage",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordStrToWordStorage.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordStrToWordStorage).toHaveBeenCalled();
      })

      it("Должна вызываться функция wordService.addWordObjToCurentList",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.addWordObjToCurentList.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.addWordObjToCurentList).toHaveBeenCalled();
      })

      it("Должна вызываться функция wordService.getWord",()=>{
        spyOn(component, "showAlertMessage").and.callFake((msg)=>{});
        FakeWordServise.getWord.calls.reset();
        component.wordFormControl.setValue("word");
        FakeWordServise.isUnique.and.returnValue(true);
        fixture.detectChanges();
        component.onAddWordButtonClick();
        expect(FakeWordServise.getWord).toHaveBeenCalled();
      })

    })

  })

});
