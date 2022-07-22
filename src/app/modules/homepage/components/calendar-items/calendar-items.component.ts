import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog } from "@angular/material/dialog";
import { InterviewDialogComponent } from './dialog-interview/interview-dialog.component';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { INTERVIEW } from '@mocks/mock-interview';

@Component({
  selector: 'app-calendar-items',
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss']
})

export class CalendarItemsComponent implements OnInit {

  @Input() events: CalendarEvent[] = [];

  intervie:InterviewDTO;


  hovered: any;
  listOfevents: CalendarEvent[] = [];
  nameOfButton = "show more";
  showNumberOfEvents:number;

  constructor(private dialog: MatDialog) {
    this.showNumberOfEvents = 2;
    this.intervie = INTERVIEW;
  }

  ngOnInit(): void {
    this.changeListOfEvents();
  }

  openDialog(ev:CalendarEvent) {
    this.dialog.open(InterviewDialogComponent, {
      data: this.intervie,
      // height:'40%',
      // data: ProjectsService.getProject(ev.id),
    });
  }

  show() {
    if (this.nameOfButton === "show more") {
      this.nameOfButton = "show less";
      this.showNumberOfEvents = this.events.length;
    }
    else {
      this.nameOfButton = "show more";
      this.showNumberOfEvents = 2;
    }
    this.changeListOfEvents();
  }

  changeListOfEvents() {
    this.listOfevents = this.events.slice(0, this.showNumberOfEvents);
  }


}
