import { Injectable } from '@angular/core';
import axios from 'axios';
import { Projects } from '../../interfaces/candidate';

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

  constructor() {}

  // public async getProjectList(pageNumber: number): Array<Projects> {
  public async getProjectList(pageNumber: number) {
    // let res = await axios.get(this.urlGetProjectList, {data: getProjectBody})
    // .then(res => {
    // return
  }
}
