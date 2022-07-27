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
  //variables:
  newCand: Candidate[] = [];
  evaluation: Candidate[] = [];
  interview: Candidate[] = [];
  phoneInterview: Candidate[] = [];
  techInterview: Candidate[] = [];
  offer: Candidate[] = [];
  hired: Candidate[] = [];
  dropped: Candidate[] = [];
  incorrect: Candidate[] = [];

  constructor(private service: CandidatesDataService) {}
  async ngOnInit() {
    this.service.allCandidates.subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].status == 'NEW') {
          this.newCand.push(result[i]);
        } else if (result[i].status == 'HIRED') {
          this.hired.push(result[i]);
        } else if (result[i].status == 'DROPPED_OUT') {
          this.dropped.push(result[i]);
        } else if (result[i].status == 'IN_PROCESSING') {
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
          } else {
            this.incorrect.push(result[i]);
          }
        } else {
          this.incorrect.push(result[i]);
        }
      }
    });
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
        this.changeStatusAndStage(
          event.container.id,
          event.container.data[event.currentIndex].id
        );
      }
    }
  }
  async changeStatusAndStage(
    newColumn: string,
    candidateID: number
  ): Promise<void> {
    if (newColumn == ('NEW' || 'HIRED' || 'DROPPED_OUT')) {
      // console.log(`setting Status to, ${newColumn},  stage to ' '.`);
      await this.service.setStatusAndStage(candidateID, newColumn, '');
    } else {
      // console.log(`setting Status to 'IN_PROCESSING', stage to ${newColumn}.`);
      await this.service.setStatusAndStage(
        candidateID,
        'IN_PROCESSING',
        newColumn
      );
    }
    this.service.getAllCandidates();
  }
  warning(): boolean {
    //   //some kind of modal should display here
    // if true
    // changeStatusAndStage(newStatus, newStage)
    //alert('changing status');
    return true;
    // else return false;
  }
}
