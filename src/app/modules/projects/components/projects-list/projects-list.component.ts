import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import { DATA } from 'src/app/modules/commons/mockups/mock-projects';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements AfterViewInit {
  public status = '';
  public pageIndex = 1;
  public pageSize = 5;
  public data = DATA;

  constructor(
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public projectService: ProjectsService
  ) {
  
    this.projectService.getPublicProjectList(this.pageIndex, )
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
  

get projectsData() {
  return this.projectService.projects
}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // onChangePage() {
  //   console.log(this.pageIndex);
  //   console.log(this.pageSize);
  // }

  public getPaginatorData(e: PageEvent) {
    console.log(this.pageIndex, this.pageSize )
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    console.log(this.pageIndex, this.pageSize )
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

  moveToEditProject(projectId: string) {
    this._router.navigate(['edit'], { queryParams: { projectId: projectId } });
  }
}
