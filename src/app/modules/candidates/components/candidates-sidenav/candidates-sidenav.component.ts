import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateInitialsService } from 'src/app/modules/commons/services/createInitials/create-initials.service';
import { Candidate } from '../../CandidatesInterface';
import { CandidatesEvaluationComponent } from '../candidates-evaluation/candidates-evaluation.component';

@Component({
  selector: 'app-candidates-sidenav',
  templateUrl: './candidates-sidenav.component.html',
  styleUrls: ['./candidates-sidenav.component.scss']
})
export class CandidatesSidenavComponent implements OnInit {

  initial?: string;
  candidate!: Candidate;
  dialog!: MatDialog;
  constructor(
    @Inject(MAT_DIALOG_DATA) public ev: any,
    private createInitialsService: CreateInitialsService) {

  }

  ngOnInit(): void {
    this.candidate = this.ev.candidate;
    this.dialog = this.ev.dialog;
    this.initial = this.createInitialsService.createInititals(this.candidate.name)

  }
  public closeDialog() {
    this.dialog.closeAll();
  }

  evaluationClicked() {
    // if (this.dialog.openDialogs.length < 2) {
      this.dialog.open(CandidatesEvaluationComponent, {
        data: this.candidate,
        // backdropClass:"backdropClass",
        // hasBackdrop:false
      });
    // }


  }

}
