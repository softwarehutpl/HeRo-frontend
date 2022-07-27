import { Component, OnInit } from '@angular/core';
// import { Candidate } from '../../CandidatesInterface';

// export interface KanbanDisplay {
//   name: string;
//   project: string;
//   position: string;
// }

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public componentName = 'candidates';
  public isAutocomplete = false;
  public isStage = true;
  constructor() {}

  ngOnInit(): void {}
}
