import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { KanbanDisplay } from '../candidates/candidates.component';
import { DATA } from '../candidates/candidates.component';
import { Candidate } from '../../../commons/interfaces/candidate';

@Component({
  selector: 'app-candidates-kanban',
  templateUrl: './candidates-kanban.component.html',
  styleUrls: ['./candidates-kanban.component.scss'],
})
export class CandidatesKanbanComponent implements OnInit {
  new: Array<KanbanDisplay> = [];
  evaluation: Array<KanbanDisplay> = [];
  interview: Array<KanbanDisplay> = [];
  phoneInterview: Array<KanbanDisplay> = [];
  techInterview: Array<KanbanDisplay> = [];
  offer: Array<KanbanDisplay> = [];
  hired: Array<KanbanDisplay> = [];
  dropped: Array<KanbanDisplay> = [];

  constructor() {}

  ngOnInit(): void {}
  drop(event: CdkDragDrop<KanbanDisplay[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (this.warning()) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
  confirmationRequired(): boolean {
    let userConfirmed: boolean = false;

    // add magic here

    if (userConfirmed) {
      return true;
    } else {
      return false;
    }
  }
  warning() {
    //some kind of modal should display here
    alert("You're about to change user status");
    let userConfirmed: boolean = this.confirmationRequired();

    if (userConfirmed) {
      alert('axios post -> change status');
      //axios.post ...
      // +force refresh
      return true;
    } else {
      alert('user denied');
      return false;
    }
  }
}
