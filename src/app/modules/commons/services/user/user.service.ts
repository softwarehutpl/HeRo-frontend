import { Injectable } from '@angular/core';
import axios from 'axios';
import { Recruiter } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="https://swh-t-praktyki2022-app.azurewebsites.net/User/";
  async getCandidate(): Promise<Recruiter[]> {
    return await axios.post(this.url + 'GetRecruiters',{ fullName:''}, { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error get Recruiters: ", error);
      });
  }
}
