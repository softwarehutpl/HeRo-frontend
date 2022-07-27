import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../interfaces/filters';
import { ProjectsService } from '../projects/projects.service';
import { RecruitmentFiltringDTO, RecruitmentList } from '../../interfaces/recruitment';
import { Subfilter } from '../../interfaces/filters';
@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public sideBarComponentName: string = Data.sidebarButton2;
  public renderedComponentName?: string;
  public isOpenProject = true;
  public isClosedProjects = true;
  public checkboxFieldsData: Subfilter[]  = JSON.parse(JSON.stringify(Data.filtersSidebarButton3))

  constructor(
    private _router: Router,
    private _projectsService: ProjectsService
  ) {}

  setStatusForProjects(projectListFilterData: RecruitmentList)  {
    console.log(projectListFilterData)
    // this.checkboxFieldsData.subfilter.map(el => {
    //   if (el.name === 'Open') {
    //     el.checked = projectListFilterData.showOpen
    //   } else if (el.name === 'Closed') {
    //     el.checked = projectListFilterData.showClosed
    //   }
    // })
    // return this.isClosedProjects = projectListFilterData.showClosed;
  }

  filtersForComponent(renderedComponent: string) {
    this.renderedComponentName = renderedComponent;
    if (this.sideBarComponentName === renderedComponent) {
      // this.JSONToFilterData(this.dataFilter);
      return Data.filtersSidebarButton2;
    } else {
      // this.JSONToFilterData(this.dataFilter2);
      return Data.filtersSidebarButton3;
    }
  }
}
