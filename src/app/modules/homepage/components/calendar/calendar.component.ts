import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  public viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
