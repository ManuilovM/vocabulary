import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  
  word:string ="Слово";

  wordFormControl:FormControl=new FormControl('');

  onAddWordButtonClick(){

  }


  constructor() {    

  }

  ngOnInit(): void {

  }

}
