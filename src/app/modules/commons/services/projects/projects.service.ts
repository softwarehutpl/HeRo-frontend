import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import { Skill } from '../../interfaces/Skill';
import {
  Recruitment,
  GetRecruitmentListBodyRequest,
  RecruitmentList,
} from '../../interfaces/recruitment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DATA, Project, Recruiter } from '../../mockups/mock-projects';
import { RecruitmentDTO } from '../../interfaces/recruitment';


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

interface GetRecruitersItem{
  item1: number;
  item2: string;
}

interface GetRecruitersBodyResponse {
  data: GetRecruitersItem[]
}


@Injectable({
  providedIn: 'root',
})
export class ProjectsService implements OnInit {
  private recruitListIsLoaded = false;

  public urlGetProjectList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetList';
  public urlGetPublicProjecList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/GetPublicList';
  public urlGetSkillsList =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Skill/GetList';
  public urlSaveProject =
    'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Create';
  public urlRecruiterId =
    'https://swh-t-praktyki2022-app.azurewebsites.net/User/GetRecruiters';
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
  private _projects$: BehaviorSubject<Project[]> = new BehaviorSubject(
    [] as Project[]
  );
  public recruiterList: Recruiter[] = [
    { item1: 1, item2: 'admin@softwarehut.com' },
  ];
  constructor(private _activatedRoute: ActivatedRoute) {    
  }

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
    await this.getRecruiterList();
    const res = await this.getProjectList(pageNumber);
    return this.prepareProjectLis(res.data);
  }

  public async getRecruiterList() {
    if (this.recruitListIsLoaded) {
      return;
    }
    const res: GetRecruitersBodyResponse = await axios.post(this.urlRecruiterId, {}, {
      withCredentials: true,
    });
    const data: Recruiter[] = res.data;
    data.forEach((element) => {
      this.recruiterList.push(element);
      console.log(element);
    });
    this.recruitListIsLoaded = true;

    // this.recruiterList.push(res.data)
    // console.log(this.recruiterList)
  }

  private async getProjectList(pageNumber: number) {
    const res: {
      data: RecruitmentList
    } = await axios.post(
      this.urlGetPublicProjecList,
      {
        name: '',
        description: '',
        showOpen: true,
        showClosed: true,
        beginningDate: '',
        endingDate: '',
        paging: {
          pageSize: 20,
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
    );
    return res;
  }

  private prepareProjectLis(recruitmentList: RecruitmentList) {    
    const projectListReadyForTable: Project[] = [];
    recruitmentList.recruitmentDTOs.map((el: RecruitmentDTO) => {
      console.log(el);
      const recruiterData = this.recruiterList.filter(
        (elRescruiterList) => elRescruiterList.item1 === el.recruiterId
      );
      const readyProject: Project = {
        name: el.name,
        creator: recruiterData[0].item2,
        from: new Date(el.beginningDate),
        to: new Date(el.endingDate),
        resume: el.candidateCount,
        hired: el.hiredCount,
        id: el.id,
      };
      // console.log(readyProject)
      projectListReadyForTable.push(readyProject);
    });
    this._projects$.next(projectListReadyForTable);
    return projectListReadyForTable;
  }
}
