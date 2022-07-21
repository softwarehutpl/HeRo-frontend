import { Injectable } from '@angular/core';
import axios from 'axios';

import { Skill, } from '../../interfaces/Skill';
import { Recruitment, RecruitmentList, GetRecruitmentListBodyRequest,
} from '../../interfaces/recruitment';

import { Observable } from 'rxjs';

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
export class ProjectsService {

  public urlGetProjectList: string = 'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';
  public urlGetSkillsList: string = 'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public urlSkillsList: string = 'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public urlSaveProject: string = 'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Create';
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
  public isSaved!: boolean

  public projectList$ = new Observable<GetRecruitmentListBodyRequest>(
    (observer) => {
      axios
        .post(
          this.urlGetProjectList,
          { body: this.data },
          { withCredentials: true }
        )
        .then((response) => {
          observer.next(response.data);
        })
        .catch((error) => {
          observer.error(error);
        });
    }
  );

  public subscription = this.projectList$.subscribe({
    next: (data) => console.log(data),
  });

  public projectSkills$ = new Observable<Array<Skill>>((observer) => {
    axios
      .get(this.urlSkillsList, { withCredentials: true })
      .then((response) => {
        observer.next(response.data);
      })
      .catch((error) => {
        observer.error(error);
      });
  });


  

  public async saveProject(body: Recruitment): Promise<boolean> {
   console.log('servis save project')
      let saveProject = await axios.post(this.urlSaveProject, {body: body}, {withCredentials: true})
      .then(res => {
        if(res.status === 200) {
          return this.isSaved = true;
        } else { 
          return this.isSaved = false}
      })
      .catch (error => {return false} )

      return saveProject
  }

  public async getProjectList(pageNumber: number) {  }

}
