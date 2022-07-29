import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { INTERVIEW, COLORS, CALENDAR_EVENTS } from 'src/app/modules/commons/mockups/mock-interview';
import { Interview } from 'src/app/modules/commons/interfaces/interview';
import { Subject } from 'rxjs';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { CalendarService } from 'src/app/modules/commons/services/calendar/calendar.service';

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
    for (const value of this.intervieList) {
      const x: CalendarEvent = {
        id: value.interviewId,
        start: new Date(value.date),
        title: value.candidateName + " " + value.candidateLastName,
        color: this.colors.red
      };

      if (value.candidateStatus === "NEW")
        x.color = this.colors.yellow;
      else if (value.candidateStatus === "IN_PROCESSING")
        x.color = this.colors.blue;
      else if (value.candidateStatus === "DROPPED_OUT")
        x.color = this.colors.red;
      else
        x.color = this.colors.grey;

      this.events.push(x);
    }
    this.renderDay = true;
  }

}
