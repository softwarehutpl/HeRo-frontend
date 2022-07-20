import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { INTERVIEW } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview } from 'src/app/modules/commons/interfaces/interview';
import { getCurrencySymbol } from '@angular/common';
import { reduce } from 'rxjs';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { CalendarService } from 'src/app/modules/commons/services/calendar/calendar.service';

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',

  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calEv!: CalendarEvent;
  intervieListFromBacend!: InterviewDTO[];
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      id: 1,
      start: new Date("2022-07-16T03:24:00"),
      title: 'An event',
      draggable: true,
      color: this.colors.red,

    }, {
      id: 2,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event',
      draggable: true,
      color: this.colors.red,
    }, {
      id: 3,
      start: new Date("2022-07-15T13:44:00"),
      title: 'An',
      draggable: true,
      color: this.colors.blue,
    },
    {
      id: 4,
      start: new Date("2022-07-16T13:44:00"),

      // end:new Date("2022-07-18T13:44:00"),

      title: 'An event2',
      draggable: true,
      color: this.colors.yellow,
    }, {
      id: 5,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event3',
      draggable: true,
      color: this.colors.yellow,
    }, {
      id: 6,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event4',
      draggable: true,
      color: this.colors.blue,
    }, {
      id: 7,
      start: new Date("2022-07-15T03:24:00"),
      title: 'An event5showmore than needed',
      draggable: true,
      color: this.colors.red,
    }
  ];


  public interviews: Interview[] = INTERVIEW;

  constructor(private calService:CalendarService) { }

  ngOnInit(): void {
    // this.intervieListFromBacend = this.calService.getInterviewsList();
    this.fun();
  }

  fun(){
    console.log(this.calService.getInterviewsList());
  }

  public genereteListOfEvents(): void {

    this.events = [];

    this.intervieListFromBacend.forEach(el => {

      this.calEv.id = el.candidateId;
      this.calEv.start = el.date;
      this.calEv.title = el.candidateName + " " + el.candidateLastName;
      if (el.candidateStatus === "NEW")
        this.calEv.color = this.colors.red;
      else if (el.candidateStatus === "IN_PROCESSING")
        this.calEv.color = this.colors.yellow;
      else if (el.candidateStatus === "DROPPED_OUT")
        this.calEv.color = this.colors.red;
      else 
      this.calEv.color = this.colors.yellow;

      this.events.push(this.calEv);

    });

  }

}
