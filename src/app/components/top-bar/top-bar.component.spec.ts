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

  it('Должна быть видна стрелка .arrow-back если pathname = "/EnRu"', ()=>{
    component.pathname ="/EnRu";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrow-back');
    expect(arrow).toBeTruthy();
  })

  it('Должна быть видна стрелка .arrow-back если pathname = "/RuEn"', ()=>{
    component.pathname ="/RuEn";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrow-back');
    expect(arrow).toBeTruthy();
  })

  it('Не должна быть видна стрелка .arrow-back если pathname  равно "/" ', ()=>{
    component.pathname ="/";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrow-back');
    expect(arrow).not.toBeTruthy();
  })

  it('Не должна быть видна стрелка .arrow-back если pathname  равно "/RandomRoute" ', ()=>{
    component.pathname ="/RandomRote";
    fixture.detectChanges();
    const arrow = fixture.debugElement.nativeElement.querySelector('.arrow-back');
    expect(arrow).not.toBeTruthy();
  })

  it('getPageTitle должна выдавать "Главная" при pathname ="/"',()=>{
    component.pathname ="/";
    expect(component.getPageTitle()).toEqual('Главная');
  })

  it('getPageTitle должна выдавать "Англо-русский режим" при pathname ="/EnRu" ',()=>{
    component.pathname ="/EnRu";
    fixture.detectChanges();
    expect(component.getPageTitle()).toEqual('Англо-русский режим');
  })

  it('getPageTitle должна выдавать "Русско-английский режим" при pathname ="/RuEn" ',()=>{
    component.pathname ="/RuEn";
    fixture.detectChanges();
    expect(component.getPageTitle()).toEqual('Русско-английский режим');
  })


});
