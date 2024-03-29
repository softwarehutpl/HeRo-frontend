import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectsService } from 'src/app/modules/commons/services/projects/projects.service';
import { ProjectListDataSource } from './ProjectListDataSource';
import { FiltersService } from 'src/app/modules/commons/services/filters/filters.service';
import { CandidatesDataService } from 'src/app/modules/candidates/services/candidates-data.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  public status = '';
  public pageIndex = 1;
  public pageSize = 5;
  public dataSource = new ProjectListDataSource(this.projectService.projects);
  public displayedColumns = [
    'name',
    'creator',
    'from',
    'to',
    'resume',
    'hired',
    'edit',
  ];


  constructor(
    private _router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    public projectService: ProjectsService,
    public filterService: FiltersService,
    private _candiadteService: CandidatesDataService
  ) {}


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  get projectsData() {
    return this.projectService.projects;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.projectService.getPublicProjectList(this.filterService.showOpen, this.filterService.showClosed);
  }

  public getPaginatorData(e: PageEvent) {
    this.projectService.pageIndex = e.pageIndex;
    this.projectService.pageSize = e.pageSize;
    this.projectService.getPublicProjectList(this.filterService.showOpen, this.filterService.showClosed);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public async moveToCandidates(projectName: string, status?: string) {

    if (status) {
      this.filterService.idNEW = false;
      this.filterService.idIN_PROCESSING = false;
      this.filterService.idDROPPED_OUT = false;
    }
 
    await this._router.navigate(['/candidates'], {
      queryParams: {
        project: projectName,
        ...(status === undefined ? {} : { status: status }),
      },
    });
    this._candiadteService.getCandidatesForList();
  }

  moveToEditProject(projectId: number) {

    this.projectService.getProjectById(projectId);
    this._router.navigate(['edit'], { queryParams: { projectId: projectId } });
  }
}
