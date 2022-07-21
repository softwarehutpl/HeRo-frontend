import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar-head',
  templateUrl: './calendar-head.component.html',
  styleUrls: ['./calendar-head.component.scss']
})
export class CalendarHeadComponent  {

  @Input() view!: CalendarView ;

  @Input() viewDate!: Date;

  @Input() locale: string = 'en';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
  

}
