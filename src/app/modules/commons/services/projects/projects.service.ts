import { Injectable, OnInit } from '@angular/core';
import axios from 'axios';
import {
  Recruitment,
  GetRecruitmentListBodyRequest,
  RecruitmentList,
  SkillById,
} from '../../interfaces/recruitment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Project, Recruiter } from '../../mockups/mock-projects';
import { RecruitmentDTO, GetRecruitersItem } from '../../interfaces/recruitment';

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

interface GetRecruitersBodyResponse {
  data: GetRecruitersItem[];
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
  public urlGetProjectId =
    `https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Get/`;
    public urlSaveEditedProject = 'https://swh-t-praktyki2022-app.azurewebsites.net/Recruitment/Edit/'
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
  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject(
    [] as Project[]
  );
  public recruiterList: Recruiter[] = [
    { id: 1, fullName: 'admin admin' },
  ];

  public pageIndex = 0;
  public pageSize = 5;
  public pageSizeOptions = [5, 10, 25, 100];
  public listLength!: number;

  constructor(private _activatedRoute: ActivatedRoute) {}

  get projects() {
    return this.projects$.asObservable();
  }

  ngOnInit() {
    // this._activatedRoute.queryParams.subscribe((params) => {
    //   this.projectId = params['projectId'];
    // });
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

  public projectSkills$ = new Observable<SkillById[]>((observer) => {
    axios
      .get(this.urlGetSkillsList, { withCredentials: true })
      .then((response) => {
        console.log(response)
        observer.next(response.data);
      })
      .catch((error) => {
        observer.error(error);
      });
  });

  public async saveProject(body: Recruitment, queryIdParam: number) {


    if(queryIdParam) {

      const updataProject = await axios.post(this.urlSaveEditedProject, body,{ withCredentials: true});
      console.log(updataProject)
    }
    let isSaved = false;
    const saveProject = await axios
      .post(this.urlSaveProject, body, { withCredentials: true })

      .then((res) => {
        if (res.status === 200) {
          return (isSaved = true);
        } else {
          return (isSaved = false);
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    // if (saveProject) {
    //   alert('project saved');
    //   // this._router.navigate(['projects'])
    // return saveProject;
  }


  public async getProjectById(proejctId: number) {

    const urlGetProjectIdWithIdis = this.urlGetProjectId + proejctId;
    const projectById = await axios.get(urlGetProjectIdWithIdis , 
      {withCredentials: true});
    return projectById.data
  }

  public readingProjectIdFromQueryParam() {
    return this.projectId;
  }

  public async getPublicProjectList() {
    await this.getRecruiterList();
    const res = await this.getProjectList();
    return this.prepareProjectLis(res.data);
  }

  public async getRecruiterList() {
    if (this.recruitListIsLoaded) {
      return;
    }
    const res: GetRecruitersBodyResponse = await axios.post(
      this.urlRecruiterId,
      {},
      {
        withCredentials: true,
      }
    );
    const data: Recruiter[] = res.data;
    data.forEach((element) => {
      this.recruiterList.push(element);
    });
    this.recruitListIsLoaded = true;
  }

  private async getProjectList() {
    const res: {
      data: RecruitmentList;
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
          pageSize: this.pageSize,
          pageNumber: this.pageIndex + 1,
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

    this.listLength = recruitmentList.totalCount;
    this.pageSize = recruitmentList.paging.pageSize;
    this.pageIndex = recruitmentList.paging.pageNumber - 1;

    const projectListReadyForTable: Project[] = [];

    recruitmentList.recruitmentDTOs.map((el: RecruitmentDTO) => {
      const recruiterData = this.recruiterList.filter(
        (elRescruiterList) => elRescruiterList.id === el.recruiterId
      );
      const readyProject: Project = {
        name: el.name,
        creator: recruiterData[0].fullName,
        from: new Date(el.beginningDate),
        to: new Date(el.endingDate),
        resume: el.candidateCount,
        hired: el.hiredCount,
        id: el.id,
      };
      projectListReadyForTable.push(readyProject);
    });
    this.projects$.next(projectListReadyForTable);
    return projectListReadyForTable;
  }
}
