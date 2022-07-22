import { Injectable } from '@angular/core';
import { Candidate } from '../../commons/interfaces/candidate';
import { useMocks } from '../../commons/mockups/useMocks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CandidatesDataService {

  private _candidates: BehaviorSubject<Candidate[]> = new BehaviorSubject([] as Candidate[])

  constructor(private _http: HttpClient, 
    ) {
      
    this.getAllCandidates()
  }
 get candidates(){
  return this._candidates.asObservable();
 }

 //paginator settings:
 public pageIndex: number = 0;
 public pageSize: number = 5;
 public pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];
 public listLength!:number;

  @useMocks(false, import(`@mocks/candidates.json`))
  public async getAllCandidates(): Promise<void> {
    console.log('Fetching Candidates from API');

    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      paging: {
        pageSize: this.pageSize,
        pageNumber: this.pageIndex +1,
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
          console.log(res);
          this.listLength=res.data.totalCount;
          this.pageSize=res.data.paging.pageSize;
          this.pageIndex=res.data.paging.pageNumber-1;
          this._candidates.next(res.data.candidateInfoForListDTOs);
        //return res.data.candidateInfoForListDTOs;
        } else {
          console.log('Error, status not OK');
        }
      })
      .catch((err) => console.log(err));
  }
}
