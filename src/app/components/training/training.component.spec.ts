import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";

import { TrainingComponent } from "./training.component";

describe("TrainingComponent", () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TrainingComponent],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

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

  describe("openAlertMessage(msg)",()=>{
    it("Должна менять свойство message на msg из аргумента",()=>{
      component.message="";
      fixture.detectChanges();
      component.openAlertMessage("Сообщение");
      expect(component.message).toEqual("Сообщение");
    })
  })

  describe("closeAlertMessage()", ()=>{
    it("Должна присваевать свойству message пустую строку",()=>{
      component.message="Сообщение1";
      fixture.detectChanges();
      component.closeAlertMessage();
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
});
