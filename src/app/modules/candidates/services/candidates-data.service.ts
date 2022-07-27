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
  private _candidates: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _candidatesAll: Promise<Candidate[]> = this.getAllCandidates();

  // private _statuses = this.getStatuses();
  // private _stages = this.getStages();
  private _statuses: Promise<string[]> = this.getStatuses();
  private _stages: Promise<string[]> = this.getStages();

  constructor() {
    this.getCandidatesForList();
  }

  get candidates() {
    return this._candidates.asObservable();
  }
  get allCandidates() {
    return from(this._candidatesAll);
  }

  get statuses() {
    // return this._statuses;
    return from(this._statuses);
  }
  get stages() {
    // return this._stages;
    return from(this._stages);
  }

  //paginator settings:
  public pageIndex = 0;
  public pageSize = 5;
  public pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];
  public listLength!: number;

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getCandidatesForList(): Promise<void> {
    // console.log('Fetching Candidates from API');

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
          // console.log(res);
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
    // console.log('Fetching Candidates by status');
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      status: status,
      stage: stage,
      paging: {
        pageSize: 20, //max 20 elements to reduce clutter
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
          console.log(res);
          return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getAllCandidates(): Promise<Candidate[]> {
    // console.log('Fetching All Candidates');
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: 20, //max 20 elements to reduce clutter
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
          // console.log(res);
          return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  public async getStatuses(): Promise<string[]> {
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetStatusList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .get(URL, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          return res.data;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  public async getStages(): Promise<string[]> {
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetStageList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const Options = {
      header: headers,
      withCredentials: true,
    };

    return await axios
      .get(URL, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          return res.data;
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
  ): Promise<void> {
    // console.log('Fetching All Candidates');
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/Edit';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      candidateId: candidateID,
      status: newStatus,
      stage: newStage,
      // paging: {
      //   pageSize: 20, //max 20 elements to reduce clutter
      //   pageNumber: 1, //API requirement
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
          console.log(res);
          console.log('Status and Stage changed');
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }
}
