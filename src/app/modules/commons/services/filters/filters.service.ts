import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../interfaces/filters';
import { ProjectsService } from '../projects/projects.service';
import { RecruitmentList } from '../../interfaces/recruitment';
import { Subfilter } from '../../interfaces/filters';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public sideBarComponentName: string = Data.sidebarButton2;
  // public renderedComponentName?: string;
  public isOpenProject = true;
  public isClosedProjects = true;
  public checkboxFieldsData: Subfilter[]  = JSON.parse(JSON.stringify(Data.filtersSidebarButton3));
  public urlStageListForCandidates = 'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetStageList';
  public urlStatusListForCandidates = 'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetStatusList';

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

  public async getStageAndStatusList() {
    const stageForCandidates = await axios.get(this.urlStageListForCandidates, {withCredentials: true});
    const statusForCandidates = await axios.get(this.urlStatusListForCandidates, {withCredentials: true});
    const dataForCheckboxCandidates = {status: statusForCandidates.data, stage: stageForCandidates.data};
    return dataForCheckboxCandidates;
  }

  filtersForComponent(renderedComponent: string) {
    // this.renderedComponentName = renderedComponent;
    if ("candiates" === renderedComponent) {
      console.log("candidates")
      // this.JSONToFilterData(this.dataFilter);
      return Data.filtersSidebarButton2;
    } else {
      // this.JSONToFilterData(this.dataFilter2);
      return Data.filtersSidebarButton3;
    }
  }
}
