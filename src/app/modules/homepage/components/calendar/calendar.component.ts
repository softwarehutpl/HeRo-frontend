import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { INTERVIEW } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview, InterviewList } from 'src/app/modules/commons/interfaces/interview';
import { getCurrencySymbol } from '@angular/common';
import { reduce, Subject } from 'rxjs';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { CalendarService } from 'src/app/modules/commons/services/calendar/calendar.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CalendarItemsComponent } from '../calendar-items/calendar-items.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',

  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  // renderDay$ :Observable<boolen> = of(false);
  renderDay =false;
  intervieList!: InterviewDTO[];
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
  events: CalendarEvent[] = [];
  // events: CalendarEvent[] = [
  //   {
  //     id: 1,
  //     start: new Date("2022-07-16T03:24:00"),
  //     title: 'An event',
  //     draggable: true,
  //     color: this.colors.red,

  //   }, {
  //     id: 2,
  //     start: new Date("2022-07-15T03:24:00"),
  //     title: 'An event',
  //     draggable: true,
  //     color: this.colors.red,
  //   }, {
  //     id: 3,
  //     start: new Date("2022-07-15T13:44:00"),
  //     title: 'An',
  //     draggable: true,
  //     color: this.colors.blue,
  //   },
  //   {
  //     id: 4,
  //     start: new Date("2022-07-16T13:44:00"),

  //     // end:new Date("2022-07-18T13:44:00"),

  //     title: 'An event2',
  //     draggable: true,
  //     color: this.colors.yellow,
  //   }, {
  //     id: 5,
  //     start: new Date("2022-07-15T03:24:00"),
  //     title: 'An event3',
  //     draggable: true,
  //     color: this.colors.yellow,
  //   }, {
  //     id: 6,
  //     start: new Date("2022-07-15T03:24:00"),
  //     title: 'An event4',
  //     draggable: true,
  //     color: this.colors.blue,
  //   }, {
  //     id: 7,
  //     start: new Date("2022-07-15T03:24:00"),
  //     title: 'An event5showmore than needed',
  //     draggable: true,
  //     color: this.colors.red,
  //   }
  // ];


  refresh = new Subject<void>();
  public interviews: Interview[] = INTERVIEW;

  constructor(private _calService: CalendarService, private ref: ChangeDetectorRef) {
    //@ts-ignore
window['getEvents'] = () => this.events;
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    await this.makeListOfEvents();
  }

 

  //(beforeViewRender)="beforeMonthViewRender($event)" ->html
  //  beforeMonthViewRender(renderEvent: any): void {
  //   this.loadData();
  //   this.makeListOfEvents();
  // }

  async loadData():Promise<void> {
    const response = await this._calService.getInterviewsList();
    this.intervieList = response.interviewDTOs;

  }

  private async makeListOfEvents() {

    this.events = [];
    for (let value of this.intervieList) {
      const x: CalendarEvent ={
        id: value.candidateId,
        start: new Date(value.date),
        title: value.candidateName + " " + value.candidateLastName,
        color: this.colors.red
      };

      if (value.candidateStatus === "NEW")
        x.color = this.colors.red;
      else if (value.candidateStatus === "IN_PROCESSING")
        x.color = this.colors.yellow;
      else if (value.candidateStatus === "DROPPED_OUT")
        x.color = this.colors.red;
      else
        x.color = this.colors.yellow;
      
      this.events.push(x);
    };
    this.renderDay =true;
  }

}
