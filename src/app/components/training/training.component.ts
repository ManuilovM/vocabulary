import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  @Output() currentPageTitle:string;

  constructor(public router: Router) {    
    let url=this.router.url;
    if(url==="/EnRu") this.currentPageTitle = "Англо-русский режим";
    if(url==="/RuEn") this.currentPageTitle= "Русско-английский режим";
  }

  ngOnInit(): void {

  }

}
