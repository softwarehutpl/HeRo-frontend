import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../commons/interfaces/candidate';
import { CANDIDATES } from '../../../commons/mockups/mock-candidates';

const DATA: Array<Candidate> = CANDIDATES;
@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
})
export class CandidatesListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'id',
    'name',
    'source',
    'projects',
    'position',
    'status',
    'stage',
    'assignee',
    'profile',
  ];
  public dataSource = DATA;
}
