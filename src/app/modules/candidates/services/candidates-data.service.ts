import { Injectable } from '@angular/core';
import { Candidate } from '../../commons/interfaces/candidate';
import { useMocks } from '../../commons/mockups/useMocks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CandidatesDataService {
  private _candidates: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _newCandidates: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _inProcessing: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _hired: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  private _dropped: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );

  constructor() {
    this.getAllCandidates();

    // this._newCandidates.next(this.getCandidatesByStatus('NEW')); //nope
  }

  get candidates() {
    return this._candidates.asObservable();
  }
  get newCandidates() {
    return this._newCandidates.asObservable();
  }
  get inProcessing() {
    return this._newCandidates.asObservable();
  }
  get hired() {
    return this._newCandidates.asObservable();
  }
  get dropped() {
    return this._newCandidates.asObservable();
  }

  @useMocks(false, import(`@mocks/candidates.json`)) // if true -> overrides function and returns data from path.
  public async getAllCandidates(): Promise<Array<Candidate>> {
    console.log('Fetching Candidates from API');

    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: 1000,
        pageNumber: 1,
      },
    };
    const Options = {
      header: headers,
      withCredentials: true,
    };

    // return this._http.post<Array<Candidate>>(URL, Options); // this will be default
    // return this._http.post<any>(URL, body, Options);
    // return this.axios
    //   .post(URL, body)
    //   .then((res) => {
    //     if (res.statusText === 'OK') {
    //       console.log(res);
    //       return res;
    //     } else {
    //       console.log(res.statusText);
    //       return;
    //     }
    //   })
    //   .catch((err) => console.log(err));

    return await axios
      .post(URL, body, Options)
      .then((res) => {
        if (res.statusText === 'OK') {
          console.log(res.data.candidateInfoForListDTOs);
          return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getCandidatesByStatus(
    status: string,
    stage?: string
    //sort?: string
  ): Promise<Candidate[]> {
    console.log('Fetching Candidates by status');
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      status: [status],
      stage: [stage],
      paging: {
        pageSize: 10, //max 10 elements to reduce clutter
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
}
