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

  // private _newCandidates: Promise<Candidate[]> = this.getCandidatesByStatus([
  //   'NEW',
  // ]);
  // private _hired: Promise<Candidate[]> = this.getCandidatesByStatus(['HIRED']);
  // private _dropped: Promise<Candidate[]> = this.getCandidatesByStatus([
  //   'DROPPED_OUT',
  // ]);
  // private _evaluation: Promise<Candidate[]> = this.getCandidatesByStatus(
  //   [],
  //   ['EVALUATION']
  // );
  // private _interview: Promise<Candidate[]> = this.getCandidatesByStatus(
  //   [],
  //   ['INTERVIEW']
  // );
  // private _phoneInterview: Promise<Candidate[]> = this.getCandidatesByStatus(
  //   [],
  //   ['PHONE_INTERVIEW']
  // );
  // private _techInterview: Promise<Candidate[]> = this.getCandidatesByStatus(
  //   [],
  //   ['TECH_INTERVIEW']
  // );
  // private _offer: Promise<Candidate[]> = this.getCandidatesByStatus(
  //   [],
  //   ['OFFER']
  // );

  constructor() {
    this.getCandidatesForList();
    // this.getAllCandidates();
  }

  get candidates() {
    return this._candidates.asObservable();
  }
  get allCandidates() {
    return from(this._candidatesAll);
  }
  // get newCandidates() {
  //   return from(this._newCandidates);
  // }
  // get hired() {
  //   return from(this._hired);
  // }
  // get dropped() {
  //   return from(this._dropped);
  // }
  // get evaluation() {
  //   return from(this._evaluation);
  // }
  // get interview() {
  //   return from(this._interview);
  // }
  // get phoneInterview() {
  //   return from(this._phoneInterview);
  // }
  // get techInterview() {
  //   return from(this._techInterview);
  // }
  // get offer() {
  //   return from(this._offer);
  // }

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
}
