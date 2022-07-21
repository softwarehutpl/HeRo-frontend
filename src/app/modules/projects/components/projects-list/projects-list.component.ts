import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import { DATA } from 'src/app/modules/commons/mockups/mock-projects';

export interface Projects {
  name: string;
  creator: string;
  from: Date;
  to: Date;
  resume: number;
  hired: number;
}
// 

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements AfterViewInit {
  public status: string = '';
  public pageIndex: number = 0;
  public pageSize: number = 0;
  public data?: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private _projectService: ProjectsService
  ) {
    // this.data = _projectService.getProjectList(this.pageIndex)
  }

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // onChangePage() {
  //   console.log(this.pageIndex);
  //   console.log(this.pageSize);
  // }

  public getPaginatorData(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.getNextPage
  }

  public getNextPage() {
    // const list = this._projectService.getProjectList(this.pageIndex);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  moveToCandidates(projectName: string, status?: string) {
    this._router.navigate(['/candidates'], {
      queryParams: {
        project: projectName,
        ...(status === undefined ? {} : { status: status }),
      },
    });

  }

  moveToEditProject(projectName: string) {
    this._router.navigate(['edit'], { queryParams: { project: projectName } });
  }
}
