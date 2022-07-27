import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Candidate } from '../../CandidatesInterface';

export const MY_DATE_FORMATS  = {
  parse: {
    dateInput: 'dd.MM.YYYY',
  },
  display: {
    dateInput: 'dd.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-candidates-evaluation',
  templateUrl: './candidates-evaluation.component.html',
  styleUrls: ['./candidates-evaluation.component.scss'],
  providers: [
    { provide: MY_DATE_FORMATS , useValue: MY_DATE_FORMATS  }
  ]
})
export class CandidatesEvaluationComponent implements OnInit {

  date = new FormControl();
  text = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate) { }

  ngOnInit(): void {
      console.log();
  }

  commit(){
    console.log("hej zatwierdzam")
  }
fun(){
  console.log(this.text.value);
}
  
}
