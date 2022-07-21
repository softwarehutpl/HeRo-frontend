import { Injectable } from '@angular/core';
import { Candidate } from '../../commons/interfaces/candidate';
import { useMocks } from '../../commons/mockups/useMocks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidatesDataService {
  constructor(private _http: HttpClient) {}

  get(): Observable<any> {
    const URL = '';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const Options = {
      headers,
    };
    return this._http.get<any>(URL, Options);
  }

  @useMocks(false, import(`@mocks/candidates.json`)) // if true -> overrides function and returns data from path.
  public async getAllCandidates() {
    console.log('Fetching Candidates from API');

    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: 10,
        pageNumber: 1,
      },
    };
    const Options = {
      headers,
      withCredentials: true,
    };

    // return this._http.post<Array<Candidate>>(URL, Options); // this will be default
    return this._http.post<any>(URL, body, Options);
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
  }
}
