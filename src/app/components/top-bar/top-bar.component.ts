import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() pageTitle: string ="";

  public pathname = window.location.pathname;

  isTrainingComponent():boolean{
    return  this.pathname ==="/EnRu"||this.pathname=="/RuEn";
  } 

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

 
  
}
