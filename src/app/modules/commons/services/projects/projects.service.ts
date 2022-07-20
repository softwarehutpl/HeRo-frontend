import { Injectable } from '@angular/core';
import axios from 'axios';
import { GetRecruitmentListBodyRequest, RecruitmentList } from '../../interfaces/recruitment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  public urlGetProjectList: string =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';
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
  public projectList$ = new Observable<GetRecruitmentListBodyRequest>((observer) => {
    axios.post(this.urlGetProjectList, { body: this.data }, {withCredentials: true})
    .then((response) => {
      observer.next(response.data);
      
    })
    .catch((error) => {
      observer.error(error);
    });
  })
      
  public subscription = this.projectList$.subscribe( {
    next: data => console.log(data)
  })

  constructor() {}

  // public async getProjectList(pageNumber: number): Array<Projects> {
  public async getProjectList(pageNumber: number) {
    let res = await axios
      .post(this.urlGetProjectList, { body: this.data }, {withCredentials: true})
      .then((res) => {
        console.log(res);
      });
    return res;
  }


  // public async getProjectList(pageNumber?: number) Observable<RecruitmentList> {
  //   let res = await axios
  //     .post(this.urlGetProjectList, { body: this.data }, {withCredentials: true})
  //     .then((res) => {
  //       console.log(res);
  //       return res
  //     });
  //   return res;
  // }
}
