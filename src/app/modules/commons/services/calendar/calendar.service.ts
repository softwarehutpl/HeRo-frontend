import { Injectable } from '@angular/core';
import axios from 'axios';
import { InterviewList, InterviewDTO } from '../../interfaces/interview';
import { CandidateCreate } from '../../interfaces/candidate';



@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public url = 'https://swh-t-praktyki2022-app.azurewebsites.net/Interview';

  public getListInterviewsBody = {
    fromDate: '1900-01-01',
    toDate: '2024-01-01',
    candidateId: null,
    workerId: null,
    type: null,
    paging: {
      pageSize: 10000,
      pageNumber: 1
    },
    sortOrder: {
      sort: [
        {
          key: '',
          value: '',
        }
      ]
    }
  };


  async getInterviewsList(): Promise<InterviewList> {

    // console.log('body', this.getListInterviewsBody, this.url)
    return await axios.post(this.url + '/GetList', this.getListInterviewsBody,
      { withCredentials: true })
      .then((response) => {
        // console.log({ response });
        return response.data;
      }).catch((error) => {
        console.log("error get intervie list: ", error);
      });
  }


  async getInterview(id: number): Promise<InterviewDTO> {
    return await axios.get(this.url + '/Get/' + id, { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error get intervie : ", id, " ", error);
      });

  }

  createInterview(interview: CandidateCreate) {

    const header = {
      accept: 'text/plain',
      withCredentials: true,
      'Content-Type':'application/json-patch+json'
    }

    console.log('intervie:',interview);
    axios.post(this.url + '/Create', interview , { withCredentials: true, })

      .catch((error) => {
        console.log("error create intervie : ", interview, " ", error);
      });
  }

}