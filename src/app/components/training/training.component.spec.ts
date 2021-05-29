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
});
