import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';

import { Skill } from '../../interfaces/Skill';
import {
  Recruitment,
  GetRecruitmentListBodyRequest,
} from '../../interfaces/recruitment';

import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DATA, Project } from '../../mockups/mock-projects';


const getProjectBody = {
  name: '',
  description: '',
  beginningDate: '1900-01-01',
  endingDate: new Date(),
  paging: {
    pageSize: 10,
    pageNumber: 1,
  },
  sortOrder: {
    sort: [
      {
        key: '',
        value: '',
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class ProjectsService implements OnInit {
  public urlGetProjectList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';
  public urlGetPublicProjecList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetPublicList';
  public urlGetSkillsList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public urlSaveProject =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Create';
  public projectId = 0;
  public data: GetRecruitmentListBodyRequest = {
    name: '',
    description: '',
    showOpen: true,
    showClosed: true,
    beginningDate: '',
    endingDate: '',
    paging: {
      pageSize: 0,
      pageNumber: 0,
    },
    sortOrder: {
      sort: [
        {
          key: "'",
          value: '',
        },
      ],
    },
  };
  public isSaved!: boolean;
  private _projects$: BehaviorSubject<Project[]> = new BehaviorSubject(DATA);

  constructor(private _activatedRoute: ActivatedRoute) {}

  get projects() {
    return this._projects$.asObservable();
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.projectId = params['projectId'];
    });
  }

  // public projectList$ = new Observable<GetRecruitmentListBodyRequest>(
  //   (observer) => {
  //     axios
  //       .post(
  //         this.urlGetProjectList,
  //         { body: this.data },
  //         { withCredentials: true }
  //       )
  //       .then((response) => {
  //         observer.next(response.data);
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   }
  // );

  // public subscription = this.projectList$.subscribe({
  //   next: (data) => console.log(data),
  // });

  public projectSkills$ = new Observable<Array<Skill>>((observer) => {
    axios
      .get(this.urlGetSkillsList, { withCredentials: true })
      .then((response) => {
        observer.next(response.data);
      })
      .catch((error) => {
        observer.error(error);
      });
  });


  public async saveProject(body: Recruitment): Promise<boolean> {
    const saveProject = await axios
      .post(this.urlSaveProject, body, { withCredentials: true })
      .then((res) => {
        console.log('response ' + res.status);
        if (res.status === 200) {
          return (this.isSaved = true);
        } else {
          return (this.isSaved = false);
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });


    if (saveProject) {
      alert('project saved');
      // this._router.navigate(['projects'])
    }

    return saveProject;
  }

  public readingProjectIdFromQueryParam() {
    return this.projectId;
  }

  public async getPublicProjectList(pageNumber: number) {
    console.log('getPublicProjectList');
    axios
      .post(
        this.urlGetPublicProjecList,
        {
          name: '',
          description: '',
          showOpen: true,
          showClosed: true,
          beginningDate: '',
          endingDate: '',
          paging: {
            pageSize: 5,
            pageNumber: pageNumber,
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
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.recruitmentDTOs);
        this._projects$.next(res.data.recruitmentDTOs);
      });
  }
}
