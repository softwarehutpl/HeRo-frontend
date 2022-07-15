import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { INTERVIEW } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview } from 'src/app/modules/commons/interfaces/interview';

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();
  events: CalendarEvent[] = [ 
  //   {
  //   start: new Date("2022-07-15T03:24:00"),
  //   title: 'An event',
  //   draggable: true,
  // },{
  //   start: new Date("2022-07-15T13:44:00"),
  //   title: 'An event2',
  //   draggable: true,
  // },
  // {
  //   start: new Date("2022-07-16T13:44:00"),
  //   end:new Date("2022-07-18T13:44:00"),
  //   title: 'An event2',
  //   draggable: true,
  // }
];

  public interviews :Interview[] = INTERVIEW

  constructor() { }

  ngOnInit(): void {
  }
}
