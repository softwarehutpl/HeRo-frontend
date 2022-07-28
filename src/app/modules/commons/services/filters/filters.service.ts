import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../../interfaces/filters';
import { ProjectsService } from '../projects/projects.service';
import { RecruitmentList } from '../../interfaces/recruitment';
import { Filter, Subfilter } from '../../interfaces/filters';
import { Observable } from 'rxjs';
import { ProjectListoToAutocomplete } from '@mocks/mock-projects';
import axios from 'axios';
import { RecruitmentDTO } from '../../interfaces/recruitment';


@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public sideBarComponentName: string = Data.sidebarButton2;
  // public renderedComponentName?: string;
  public isOpenProject = true;
  public isClosedProjects = true;
  public checkboxFieldsData: Filter[]  = JSON.parse(JSON.stringify(Data.filtersSidebarButton3));
 public urlAllProjectList = 'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';
public projectsListToAutocomplete: ProjectListoToAutocomplete[] = [];
public showOpen = true;
public showClosed = true;

  constructor(
    private _router: Router,
    private _projectsService: ProjectsService,
  ) {
  }

public projectList$ = new Observable<ProjectListoToAutocomplete[]>((observer) => {
   axios.post(this.urlAllProjectList, {
    name: '',
    description: '',
    showOpen: true,
    showClosed: true,
    beginningDate: '',
    endingDate: '',
    paging: {
      pageSize: 100,
      pageNumber: 1,
    },
    sortOrder: {
      sort: [
        {
          key: "'",
          value: '',
        },
      ],
    },
  },
  { withCredentials: true })
  .then( (res) => {
    // console.log(res)
    this.projectsListToAutocomplete = [];
    res.data.recruitmentDTOs.map((el: RecruitmentDTO) =>  {
      const projectListElement: ProjectListoToAutocomplete = {
        projectName: el.name,
        projectId: el.id
      }
      this.projectsListToAutocomplete.push(projectListElement)
      // console.log(this.projectsListToAutocomplete)
    })
  })
  .catch( error => console.log(error))

})

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
