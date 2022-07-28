import { Injectable } from '@angular/core';
import { Candidate } from '../CandidatesInterface';
import { useMocks } from '../../commons/mockups/useMocks';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CandidatesDataService {
  constructor() {
    this.getCandidatesForList();
  }

  //variables:
  private _candidates: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _candidatesAll: Promise<Candidate[]> = this.getAllCandidates();
  //paginator settings:
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];
  public listLength!: number;

  //getters:
  get candidates() {
    return this._candidates.asObservable();
  }
  get allCandidates() {
    return from(this._candidatesAll);
  }

  //functions:
  @useMocks(false, import(`@mocks/candidates.json`))
  public async getCandidatesForList(): Promise<void> {
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: this.pageSize,
        pageNumber: this.pageIndex + 1,
      },
    };
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .post(URL, body, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          this.listLength = res.data.totalCount;
          this.pageSize = res.data.paging.pageSize;
          this.pageIndex = res.data.paging.pageNumber - 1;
          this._candidates.next(res.data.candidateInfoForListDTOs);
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getCandidatesByStatus(
    status?: string[],
    stage?: string[]
    //sort?: string
  ): Promise<Candidate[]> {
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      status: status,
      stage: stage,
      paging: {
        pageSize: 50,
        pageNumber: 1, //API requirement
      },
      // sortOrder: {
      //   sort: [
      //     {
      //       key: 'id',
      //       value: sort,
      //     },
      //   ],
      // },
    };
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .post(URL, body, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getAllCandidates(): Promise<Candidate[]> {
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: 50,
        pageNumber: 1, //API requirement
      },
    };
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .post(URL, body, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          console.log('Fetched all candidates');

          return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  public async setStatusAndStage(
    candidateID: number,
    newStatus: string,
    newStage: string
  ): Promise<boolean> {
    const formData = new FormData();
    formData.append('candidateId', candidateID.toString());
    formData.append('status', newStatus);
    formData.append('stage', newStage);

    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/Edit';
    const headers = new HttpHeaders({
      accept: 'multipart/form-data',
    });
    const body = formData;
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .post(URL, body, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          console.log(res.data.value);
          return true;
        } else {
          console.log('Error, status not OK');
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}
