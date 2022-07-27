import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from '../../services/candidates-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Candidate } from '../../CandidatesInterface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';

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

  constructor(
    private service: CandidatesDataService,
    public dialog: MatDialog
  ) {}
  async ngOnInit() {
    this.service.allCandidates.subscribe((result) => {
      this.sortCandidates(result);
    });
  }
  sortCandidates(data: Candidate[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].status == 'NEW') {
        this.newCand.push(data[i]);
      } else if (data[i].status == 'HIRED') {
        this.hired.push(data[i]);
      } else if (data[i].status == 'DROPPED_OUT') {
        this.dropped.push(data[i]);
      } else if (data[i].status == 'IN_PROCESSING') {
        if (data[i].stage == 'EVALUATION') {
          this.evaluation.push(data[i]);
        } else if (data[i].stage == 'INTERVIEW') {
          this.interview.push(data[i]);
        } else if (data[i].stage == 'PHONE_INTERVIEW') {
          this.phoneInterview.push(data[i]);
        } else if (data[i].stage == 'TECH_INTERVIEW') {
          this.techInterview.push(data[i]);
        } else if (data[i].stage == 'OFFER') {
          this.offer.push(data[i]);
        } else {
          this.incorrect.push(data[i]);
        }
      } else {
        this.incorrect.push(data[i]);
      }
    }
  }
  drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (this.openDialog(event)) {
        // transferArrayItem(
        //   event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.currentIndex
        // );
        this.changeStatusAndStage(
          event.container.id,
          event.container.data[event.currentIndex].id
        );
      }
    }
  }
  openDialog(event: any) {
    const dialogRef = this.dialog.open(WarningComponent);
    return dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // return result;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    });
  }

  async changeStatusAndStage(
    newColumn: string,
    candidateID: number
  ): Promise<void> {
    if (
      newColumn == 'NEW' ||
      newColumn == 'HIRED' ||
      newColumn == 'DROPPED_OUT'
    ) {
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
    await this.service.getAllCandidates();
    /* 
    This doesn't solve the problem of optimistic-behaviour. Changes are local, but back-end error is not accounted for.
    await this.service.allCandidates.subscribe((result) => this.sortCandidates(result)); 
    */
  }
}
