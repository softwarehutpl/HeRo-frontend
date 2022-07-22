import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';

import { Skill } from '../../interfaces/Skill';
import {
  Recruitment,
  GetRecruitmentListBodyRequest,
} from '../../interfaces/recruitment';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  public urlGetSkillsList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public urlSaveProject =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Create';
  public projectId = 0;
  public data: GetRecruitmentListBodyRequest = {
    name: '',
    description: '',
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

  constructor(private _activatedRoute: ActivatedRoute) {}

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
        console.log("response " + res.status)
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

      if(saveProject) {
        alert("project saved")
        // this._router.navigate(['projects'])
      }
    return saveProject;
  }

  public readingProjectIdFromQueryParam() {
    return this.projectId;
  }

  public async getProjectList(pageNumber: number) {
    console.log(pageNumber);
  }
}
