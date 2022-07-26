import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from '../../services/candidates-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Candidate } from '../../CandidatesInterface';

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

  constructor(private service: CandidatesDataService) {}

  async ngOnInit() {
    this.service.allCandidates.subscribe((result) => {
      console.log('Reading result:');
      console.log(result[0]);
      for (let i = 0; i < result.length; i++) {
        if (result[i].status == 'NEW') {
          this.newCand.push(result[i]);
        } else if (result[i].status == 'HIRED') {
          this.hired.push(result[i]);
        } else if (result[i].status == 'DROPPED_OUT') {
          this.dropped.push(result[i]);
        } else if (result[i].status == 'IN_PROCESSING') {
          /* later put inner loop of stages below */
        }
        if (result[i].stage == 'EVALUATION') {
          this.evaluation.push(result[i]);
        } else if (result[i].stage == 'INTERVIEW') {
          this.interview.push(result[i]);
        } else if (result[i].stage == 'PHONE_INTERVIEW') {
          this.phoneInterview.push(result[i]);
        } else if (result[i].stage == 'TECH_INTERVIEW') {
          this.techInterview.push(result[i]);
        } else if (result[i].stage == 'OFFER') {
          this.offer.push(result[i]);
        }
      }
    });
    // this.service.newCandidates.subscribe((result) => (this.newCand = result));
    // this.service.evaluation.subscribe((result) => (this.evaluation = result));
    // this.service.interview.subscribe((result) => (this.interview = result));
    // this.service.phoneInterview.subscribe(
    //   (result) => (this.phoneInterview = result)
    // );
    // this.service.techInterview.subscribe(
    //   (result) => (this.techInterview = result)
    // );
    // this.service.offer.subscribe((result) => (this.offer = result));
    // this.service.hired.subscribe((result) => (this.hired = result));
    // this.service.dropped.subscribe((result) => (this.dropped = result));
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
  changeStatusAndStage(status: string[], stage: string[]): void {
    // API Call to update status/stage
  }
  warning(): boolean {
    //   //some kind of modal should display here
    // if true
    // changeStatusAndStage(newStatus, newStage)
    alert('changing status');
    return true;
    // else return false;
  }
}
