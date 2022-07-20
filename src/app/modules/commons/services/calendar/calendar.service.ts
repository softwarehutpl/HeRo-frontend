import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { InterviewList } from '../../interfaces/interview';




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public url = 'https://swh-t-praktyki2022-app.azurewebsites.net/Interview';
  constructor() { }

  public getListInterviewsBody: any = {
    fromDate: '1900-01-01',
    toDate: '2024-01-01',
    candidateId: null,
    workerId: null,
    type: null,
    paging: {
      pageSize: 10,
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


  async getInterviewsList() {
    try {
      const { data } = await axios.post<InterviewList>(this.url + '/GetList', {
        body: this.getListInterviewsBody,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }, { withCredentials: true })
        .then((res) => {
          console.log(res);
          return res.data
        });
      console.log(JSON.stringify(data, null, 4));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

}