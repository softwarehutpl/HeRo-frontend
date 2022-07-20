import { Injectable } from '@angular/core';
import axios from 'axios';
import { Projects } from '../../interfaces/candidate';
import { Skill } from '../../interfaces/Skill';
import { GetRecruitmentListBodyRequest, RecruitmentList } from '../../interfaces/recruitment';
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
  public urlGetProjectList: string =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';

  public urlGetSkillsList: string =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public skills: Array<Skill> = [
    { id: 1, name: 'C_Sharp' },
    { id: 2, name: 'C_PlusPlus' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'JavaScript' },
    { id: 5, name: 'React' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'DotNET' },
    { id: 9, name: 'HTML' },
    { id: 10, name: 'CSS' },
    { id: 11, name: 'SQL' },
    { id: 12, name: 'Git' },
  ];
  public skill2: any;

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

    // let res = await axios.get(this.urlGetProjectList, {data: getProjectBody})
    // .then(res => {
    // return
  }

  public async getProject(id: number) {
    // return
  }

  async getSkillList() {
    let skill  = await axios.get(this.urlGetSkillsList, { withCredentials: true })
      .then((res) => {
        console.log(res);
        return res.data
      });
this.skill2 = skill;
    
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
