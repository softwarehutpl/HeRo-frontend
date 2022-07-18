import { Component, OnInit, Input } from '@angular/core';
import { INTERVIEW } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview } from 'src/app/modules/commons/interfaces/interview';
import { DAYS_OF_WEEK } from 'angular-calendar';

@Component({
  selector: 'app-calendar-items',
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss']
})
export class CalendarItemsComponent implements OnInit {

  @Input() intervieDate!: Date;

  public interviews = INTERVIEW;//.filter( datein =>datein.date.getDate() ===  this.day.getDate());
  //;


  // interviews
  //     console.log(this.day);
  // 
  //   
  //   ;

  constructor() {


  }

  ngOnInit(): void {
    this.interviews = INTERVIEW.filter( datein =>datein.date.getDate() ===  this.intervieDate.getDate())
    .filter( date => date.date.getMonth() === this.intervieDate.getMonth())
    .filter( date => date.date.getFullYear() === this.intervieDate.getFullYear());
    
  }

  fun(): void {

    console.log(this.intervieDate.getDate());
  }
}
