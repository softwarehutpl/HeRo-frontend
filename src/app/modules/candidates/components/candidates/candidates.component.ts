import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { CANDIDATES } from '../../../commons/mockups/mock-candidates';

export interface KanbanDisplay {
  name: string;
  project: string;
  position: string;
}
export const DATA: Array<Candidate> = CANDIDATES; //CANDIDATES will be imported from common/services

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public componentName = 'candidates';
  public isAutocomplete = false;
  constructor() {}

  ngOnInit(): void {}
}
