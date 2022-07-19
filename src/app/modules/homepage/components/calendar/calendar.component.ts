import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { INTERVIEW } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview } from 'src/app/modules/commons/interfaces/interview';
import { getCurrencySymbol } from '@angular/common';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',

  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


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
    start: new Date("2022-07-16T03:24:00"),
    title: 'An event',
    draggable: true,
    color: this.colors.red,

  }, {
    start: new Date("2022-07-15T03:24:00"),
    title: 'An event',
    draggable: true,
    color: this.colors.red,
  }, {
    start: new Date("2022-07-15T13:44:00"),
    title: 'An',
    draggable: true,
    color: this.colors.blue,
  },
  {
    start: new Date("2022-07-16T13:44:00"),

    // end:new Date("2022-07-18T13:44:00"),

    title: 'An event2',
    draggable: true,
    color: this.colors.yellow,
  }, {
    start: new Date("2022-07-15T03:24:00"),
    title: 'An event3',
    draggable: true,
    color: this.colors.yellow,
  }, {
    start: new Date("2022-07-15T03:24:00"),
    title: 'An event4',
    draggable: true,
    color: this.colors.blue,
  }, {
    start: new Date("2022-07-15T03:24:00"),
    title: 'An event5showmore than needed',
    draggable: true,
    color: this.colors.red,
  }
];


  public interviews: Interview[] = INTERVIEW

constructor() { }

ngOnInit(): void {
}

 public genereteListOfEvents():void{

  this.events=[];


 }

}
