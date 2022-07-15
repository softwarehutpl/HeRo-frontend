import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router'

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
    from: new Date('2022-01-01'),
    to: new Date('2022-04-31'),
    resume: 30,
    hired: 3,
  },
  {
    name: 'Angular Developer',
    creator: 'John Doe',
    from: new Date('2022-05-01'),
    to: new Date('2022-08-31'),
    resume: 99,
    hired: 1,
  },
  {
    name: 'React Developer',
    creator: 'John Doe',
    from: new Date('2022-09-01'),
    to: new Date('2022-12-31'),
    resume: 150,
    hired: 190,
  },
];

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})

export class ProjectsListComponent implements AfterViewInit {
  public status: string = '';

  constructor(private _router: Router, private _route: ActivatedRoute, private _liveAnnouncer: LiveAnnouncer) {}

  displayedColumns: string[] = [
    'name',
    'creator',
    'from',
    'to',
    'resume',
    'hired',
    'edit',
  ];
  dataSource = new MatTableDataSource(DATA);



  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  testFunc() {
    alert('edit button clicked');
  }
  moveToCandidates(projectName: string , status?: string) {

    // console.log(status)
    // if (status === undefined) {
    //   console.log("hello")
    //   this._router.navigate(
    //     ['/candidates'],
    //     {queryParams: {project: projectName}}
    //   )
    //   return;
    // }
    this._router.navigate(
      ['/candidates'], 
      {queryParams: {project: projectName, status: status}}
    )
  }

  moveToEditProject(projectName: string) {
    this._router.navigate(
      ['edit'], 
      {queryParams: {project: projectName}}
    )

  }


}
