import { Component, OnInit } from '@angular/core';
import { ProjectListForTable, Projects } from '../../interfaces/candidate';
import { ProjectsList, ProjectColumnLable } from '../../mockups/mock-projects';

const columnLabels = ProjectColumnLable;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public dataSource: Array<ProjectListForTable> = ProjectsList;
  public columnLable: Array<string> = ProjectColumnLable;

  constructor() {}

  ngOnInit(): void {}
  testButton() {
    alert('clicked');
  }
}
