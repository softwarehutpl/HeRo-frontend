import { Component, OnInit } from '@angular/core';

export interface Projects {
  name: string;
  creator: string;
  from: Date;
  to: Date;
  resume: number;
  hired: number;
}
const DATA: Array<Projects> = [
  {
    name: 'JavaScript Developer',
    creator: 'John Doe',
    from: new Date('2022-07-01'),
    to: new Date('2022-07-31'),
    resume: 30,
    hired: 1,
  },
  {
    name: 'Angular Developer',
    creator: 'John Doe',
    from: new Date('2022-07-01'),
    to: new Date('2022-07-31'),
    resume: 99,
    hired: 1,
  },
  {
    name: 'React Developer',
    creator: 'John Doe',
    from: new Date('2022-07-01'),
    to: new Date('2022-07-31'),
    resume: 150,
    hired: 190,
  },
];

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = [
    'name',
    'creator',
    'from',
    'to',
    'resume',
    'hired',
    'edit',
  ];
  public dataSource = DATA;

  testFunc() {
    alert('edit button clicked');
  }
}
