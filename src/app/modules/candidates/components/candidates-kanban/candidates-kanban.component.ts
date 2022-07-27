import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from '../../services/candidates-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Candidate } from '../../CandidatesInterface';
import { Observable, from } from 'rxjs';

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

  statuses: string[] = [];
  stages: string[] = [];

  allColumns = from(this.createKanbanColumns(this.statuses, this.stages));

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
    this.service.statuses.subscribe((result) => {
      // console.log(result);
      this.statuses = result;
    });
    this.service.stages.subscribe((result) => (this.stages = result));
  }
  drop(event: CdkDragDrop<any>) {
    // console.log('container.data: ', event.container.data[0].id);
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
        // console.log('column id: ', event.container.id);
        // console.log(
        //   event.container.data[event.currentIndex].id
        // );
        this.changeStatusAndStage(
          event.container.id,
          event.container.data[event.currentIndex].id
        );
      }
    }
  }
  changeStatusAndStage(newColumn: string, candidateID: number): void {
    if (newColumn == ('NEW' || 'HIRED' || 'DROPPED_OUT')) {
      console.log(`setting Status to, ${newColumn},  stage to ' '.`);
      this.service.setStatusAndStage(candidateID, newColumn, '');
    } else {
      console.log(`setting Status to 'IN_PROCESSING', stage to ${newColumn}.`);
      this.service.setStatusAndStage(candidateID, 'IN_PROCESSING', newColumn);
    }
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

  async createKanbanColumns(statuses: string[], stages: string[]) {
    // let result: any[] = [];
    // statuses.forEach((element: string) => {
    //   if (element != 'IN_PROCESSING') {
    //     console.log(element);
    //     result.push(element);
    //   } else {
    //     stages.forEach((e: string) => {
    //       result.push(e);
    //     });
    //   }
    // });
    // for (let i = 0; i < statuses.length; i++) {
    //   console.log(statuses[i]);
    //   console.log(stages);
    //   result.push(statuses[i]);
    // }
    // const x = statuses;
    // const y = stages;
    // const z = x.indexOf('IN_PROCESSING');
    // const result = x.splice(z, 1, y).flat();
    // return result;
  }
}
