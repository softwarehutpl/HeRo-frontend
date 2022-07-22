import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { INTERVIEW, COLORS, CALENDAR_EVENTS } from 'src/app/modules/commons/mockups/mock-interview';
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

  renderDay = false;
  intervieList!: InterviewDTO[];




  view: CalendarView = CalendarView.Month;
  public viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  colors: any;
  refresh = new Subject<void>();
  public interviews: Interview[] = INTERVIEW;

  constructor(private _calService: CalendarService, private ref: ChangeDetectorRef) {
    this.colors = COLORS;
    this.events = CALENDAR_EVENTS;
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    await this.makeListOfEvents();
  }



  async loadData(): Promise<void> {
    const response = await this._calService.getInterviewsList();
    this.intervieList = response.interviewDTOs;

  }

  private async makeListOfEvents() {

    this.events = [];
    for (let value of this.intervieList) {
      const x: CalendarEvent = {
        id: value.candidateId,
        start: new Date(value.date),
        title: value.candidateName + " " + value.candidateLastName,
        color: this.colors.red
      };

      if (value.candidateStatus === "NEW")
        x.color = this.colors.blue;
      else if (value.candidateStatus === "IN_PROCESSING")
        x.color = this.colors.yellow;
      else if (value.candidateStatus === "DROPPED_OUT")
        x.color = this.colors.red;
      else
        x.color = this.colors.yellow;

      this.events.push(x);
    };
    this.renderDay = true;
  }

}
