import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

   

  public pathname = window.location.pathname;
  pageTitle: string = this.getPageTitle();

  isTrainingComponent():boolean{
    return  this.pathname ==="/EnRu"||this.pathname=="/RuEn";
  } 

  getPageTitle():string{
    if(this.pathname==="/") return "Главная";
    if(this.pathname==="/EnRu") return "Англо-русский режим";
    if(this.pathname==="/RuEn") return "Русско-английский режим";
  }

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

 
  
}
