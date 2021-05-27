
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';




import { TrainingComponent } from './training.component';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

 
  //const fakeRouter = jasmine.createSpyObj("Router", [], {url:"EnRu"}) 
  const fakeRouter ={}
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
  
    
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
