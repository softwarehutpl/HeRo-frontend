import { Component, OnInit } from '@angular/core';
import { CandidatesDataService } from '../../services/candidates-data.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Candidate } from '../../CandidatesInterface';
import { MatDialog } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
import { CreateInitialsService } from 'src/app/modules/commons/services/createInitials/create-initials.service';

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
    private initials: CreateInitialsService,
    public dialog: MatDialog
  ) {}

  //functions:
  async ngOnInit() {
    this.service.allCandidates.subscribe((result) => {
      this.sortCandidates(result);
    });
  }
  createInititals(name: string) {
    return this.initials.createInititals(name);
  }
  sortCandidates(data: any) {
    this.newCand = [];
    this.evaluation = [];
    this.interview = [];
    this.phoneInterview = [];
    this.techInterview = [];
    this.offer = [];
    this.hired = [];
    this.dropped = [];
    this.incorrect = [];
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

  async drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      //checks if container changes
      moveItemInArray(
        //if didn't this only changes order, not pernament
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.openDialog(event); //open confirmation window
      transferArrayItem(
        //move box to new column and await response
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  openDialog(event: CdkDragDrop<Candidate[]>) {
    const dialogRef = this.dialog.open(WarningComponent, {
      data: {
        name: event.previousContainer.data[event.previousIndex].name,
        status: event.container.id,
      },
    });
    return dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        //if user confirmed send API request
        this.changeStatusAndStage(
          event.container.id,
          event.container.data[event.currentIndex].id
        ); // Possible feature: If API call fails, revert changes by calling else block
        this.service.getAllCandidates(); //refresh list
      } else {
        //if user declined move box back to original column
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
      }
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
      await this.service.setStatusAndStage(candidateID, newColumn, '.');
    } else {
      // console.log(`setting Status to 'IN_PROCESSING', stage to ${newColumn}.`);
      await this.service.setStatusAndStage(
        candidateID,
        'IN_PROCESSING',
        newColumn
      );
    }
  }
}
