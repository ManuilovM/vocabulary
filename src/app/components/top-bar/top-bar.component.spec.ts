import { ComponentFixture, TestBed } from '@angular/core/testing';


import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    
    component.pageTitle="Страница";
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be pageTitle', () => {
    expect(component.pageTitle).toBeTruthy();
  });

/* ------------------------------- arrowBack ------------------------------- */

  it('Должна быть видна стрелка .arrowBack если pathName = "/EnRu"', ()=>{
    component.pathName ="/EnRu";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrowBack');
    expect(arrow).toBeTruthy();
  })

  it('Должна быть видна стрелка .arrowBack если pathName = "/RuEn"', ()=>{
    component.pathName ="/RuEn";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrowBack');
    expect(arrow).toBeTruthy();
  })

  it('Не должна быть видна стрелка .arrowBack если pathName  равно "/" ', ()=>{
    component.pathName ="/";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrowBack');
    expect(arrow).not.toBeTruthy();
  })

  it('Не должна быть видна стрелка .arrowBack если pathName  равно "/randomRoute" ', ()=>{
    component.pathName ="/randomRote";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrowBack');
    expect(arrow).not.toBeTruthy();
  })

/* -------------------------------- pathName -------------------------------- */


  it('getPageTitle должна выдавать "Главная" при pathName ="/"',()=>{
    component.pathName ="/";
    expect(component.getPageTitle()).toEqual('Главная');
  })

  it('getPageTitle должна выдавать "Англо-русский режим" при pathName ="/EnRu" ',()=>{
    component.pathName ="/EnRu";
    fixture.detectChanges();
    expect(component.getPageTitle()).toEqual('Англо-русский режим');
  })

  it('getPageTitle должна выдавать "Русско-английский режим" при pathName ="/RuEn" ',()=>{
    component.pathName ="/RuEn";
    fixture.detectChanges();
    expect(component.getPageTitle()).toEqual('Русско-английский режим');
  })

  


});
