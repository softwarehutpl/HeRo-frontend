import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';


@Component({
  selector: 'app-calendar-items',
  templateUrl: './calendar-items.component.html',
  styleUrls: ['./calendar-items.component.scss']
})

export class CalendarItemsComponent implements OnInit {

  @Input() events: CalendarEvent[] = [];
  hovered:any;

  listOfevents: CalendarEvent[]=[];
  nameOfButton = "show more";
  max = 2;

  tructor() {
  }

  ngOnInit(): void {
    this.changeListOfEvents();
  }

  show() {
    if (this.nameOfButton === "show more") {
      this.nameOfButton = "show less";
      this.max=this.events.length;


    }
    else {
      this.nameOfButton = "show more";
      this.max=2;

    }
    this.changeListOfEvents();
  }

  changeListOfEvents() {
    this.listOfevents = this.events.slice(0, this.max);
  }


}
