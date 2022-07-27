import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BackendInfoService {
  constructor() {}
  //variables:
  private _statuses: Promise<string[]> = this.getStatuses();
  private _stages: Promise<string[]> = this.getStages();

  //getters:
  get statuses() {
    return from(this._statuses);
  }
  get stages() {
    return from(this._stages);
  }

  //functions:
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
}
