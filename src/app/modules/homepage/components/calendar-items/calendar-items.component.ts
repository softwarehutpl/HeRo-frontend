import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { InterviewDialogComponent } from './dialog-interview/interview-dialog.component';
import { InterviewDTO } from 'src/app/modules/commons/interfaces/interview';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';


@Component({
  selector: 'app-calendar-items',
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss']
})

export class CalendarItemsComponent implements OnInit {

  intervie:InterviewDTO={
    interviewId: 1,
    date:new Date("2022-07-19T12:03:24.895Z"),
    candidateId: 0,
    candidateName: "Mike",
    candidateLastName: "Mike",
    candidateEmail: "mike@gmail.com",
    workerId: 3,
    workerEmail: "string",
    type: "string"
  }

  @Input() events: CalendarEvent[] = [];

  hovered: any;
  listOfevents: CalendarEvent[] = [];
  nameOfButton = "show more";
  max = 2;

  constructor(private dialog: MatDialog) {
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
      this.max = this.events.length;


    }
    else {
      this.nameOfButton = "show more";
      this.max = 2;

    }
    this.changeListOfEvents();
  }

  changeListOfEvents() {
    this.listOfevents = this.events.slice(0, this.max);
  }


}
