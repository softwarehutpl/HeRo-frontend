import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from '../../services/candidates-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import CANDIDATES from '../../../commons/mockups/candidates.json';
import { Candidate } from '../../../commons/interfaces/candidate';
import { Observable } from 'rxjs';

const DATA = CANDIDATES; //This if brute-force import from JSON, i will use this to adapt local mockups to backend.

export interface KanbanDisplay {
  name: string;
  project: string;
  position: string;
}

@Component({
  selector: 'app-candidates-kanban',
  templateUrl: './candidates-kanban.component.html',
  styleUrls: ['./candidates-kanban.component.scss'],
})
export class CandidatesKanbanComponent implements OnInit {
  newCand: Candidate[] = [];
  evaluation: Candidate[] = [];
  interview: Candidate[] = [];
  phoneInterview: Candidate[] = [];
  techInterview: Candidate[] = [];
  offer: Candidate[] = [];
  hired: Candidate[] = [];
  dropped: Candidate[] = [];

  private candidates!: Array<Candidate>;

  constructor(private service: CandidatesDataService) {}

  async ngOnInit(): Promise<void> {
    // this.candidates = await this.service.getAllCandidates();
  }

  logData() {
    console.log('local_JSON:', DATA);
    console.log('fetched:', this.candidates);
    // console.log(this.candidates2);
  }

  drop(event: CdkDragDrop<Candidate[]>) {
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
    // let userConfirmed: boolean = false;
    // // add magic here
    // if (userConfirmed) {
    return true;
    // } else {
    //   return false;
    // }
  }
  warning() {
    //   //some kind of modal should display here
    //   alert("You're about to change user status");
    //   let userConfirmed: boolean = this.confirmationRequired();
    //   if (userConfirmed) {
    //     alert('axios post -> change status');
    //     //axios.post ...
    //     // +force refresh
    return true;
    //   } else {
    //     alert('user denied');
    //     return false;
    //   }
  }
}
