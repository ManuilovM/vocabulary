
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
      providers: [{
        provide: Router, useValue: fakeRouter
      }]
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

  xit('should be currentPageTitle EnRu',()=>{
    spyOnProperty(component.router,'url').and.returnValue("EnRu");
    fixture.detectChanges();
    expect(component.currentPageTitle).toEqual("Англо-русский режим");
  })

  xit('should be currentPageTitle RuEn',()=>{
    
    fixture.detectChanges();
    expect(component.currentPageTitle).toEqual("Русско-английский режим");

  })
});
