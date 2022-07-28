import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Recruiter, Recruiters } from 'src/app/modules/commons/interfaces/User';
import { CalendarService } from 'src/app/modules/commons/services/calendar/calendar.service';
import { UserService } from 'src/app/modules/commons/services/user/user.service';
import { Candidate, CandidateCreate } from 'src/app/modules/commons/interfaces/candidate';

export const MY_DATE_FORMATS = {
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
    { provide: MY_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class CandidatesEvaluationComponent implements OnInit {

  TYPES=[
    'NEW',
    'IN_PROCESSING',
    'DROPPED_OUT',
    'HIRED'
  ]
  scoreSlider:number|null;
  date = new FormControl();
  text = new FormControl();
  checkboxCal = new FormControl();
  textScore?:string;
  recruiters!:Recruiter[];
  recruitersfromHttp!:Recruiters;
  selectedIdRecruter!:number;
  selectedType!:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate,
    private userService: UserService,
    private interviewService: CalendarService) { 
      this.scoreSlider = 0;
    }

  async ngOnInit(): Promise<void> {
    await this.getRecruters();
  }
  async getRecruters(){
    this.recruiters = await this.userService.getCandidate();
  }

  commit() {
    console.log("hej zatwierdzam")
    if(this.checkboxCal.value === true){
      const intervie:CandidateCreate={
        date: new Date(this.date.value),
        candidateId:this.candidate.id,
        workerId: this.selectedIdRecruter,
        type: this.selectedType
      }
      this.interviewService.createInterview(intervie);
    }
  }
  fun() {
    console.log(this.text.value);
    console.log(this.checkboxCal.value);
    console.log(this.selectedIdRecruter);
    console.log(this.selectedType);
  }
  slider(ev: MatSliderChange) {
    this.scoreSlider= ev.value;
    this.changeTextScore(this.scoreSlider);

  }



  changeTextScore(score:number|null){
    if(score==null){
      this.textScore='Terrible';
    }
    else if(score==1){
      this.textScore='Terrible';
    }
    else if(score==2){
      this.textScore='Maybe next time';
    }
    else if(score==3){
      this.textScore='It was OK';
    }
    else if(score==4){
      this.textScore='It was better than OK';
    }
    else {
      this.textScore='Amazing!';
    }
  }

 

}
