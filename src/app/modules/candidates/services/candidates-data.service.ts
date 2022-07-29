import { Injectable, ɵbypassSanitizationTrustUrl } from '@angular/core';
import { Candidate } from '../CandidatesInterface';
import { useMocks } from '../../commons/mockups/useMocks';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { FiltersService } from '../../commons/services/filters/filters.service';

@Injectable({
  providedIn: 'root',
})
export class CandidatesDataService {
  constructor(
    private _route: ActivatedRoute,
    public filterService: FiltersService
  ) {
    this.getCandidatesForList();
    this.getAllCandidates();
  }

  //variables:
  private _candidates: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  // private _candidatesAll: Promise<Candidate[]> = this.getAllCandidates();
  private _candidatesAll: BehaviorSubject<Candidate[]> = new BehaviorSubject(
    [] as Candidate[]
  );
  public queryParamHired!: string | null;
  public queryParamProjectId!: string | null;
  //paginator settings:
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions: Array<number> = [5, 10, 15, 20, 25];
  public listLength!: number;
  public checkboxStage: string[] = [];

  //getters:
  get candidates() {
    return this._candidates.asObservable();
  }
  get allCandidates() {
    return this._candidatesAll.asObservable();
  }

  //functions:
  @useMocks(false, import(`@mocks/candidates.json`))
  public async getCandidatesForList(
    status?: string[],
    stage?: string[]
  ): Promise<void> {

    this.queryParamHired = this._route.snapshot.queryParamMap.get('status');
    this.queryParamProjectId =
      this._route.snapshot.queryParamMap.get('project');
    if (this.queryParamProjectId === null) {
      this.queryParamProjectId = '';
    }

    if (this.queryParamHired) {
      this.filterService.idNEW = false;
      this.filterService.idIN_PROCESSING = false;
      this.filterService.idDROPPED_OUT = false;
      if (!status?.includes(this.queryParamHired)) {
        if (status) {
          status.push(this.queryParamHired);
        } else {
          status = [this.queryParamHired];
        }
      }
    } else {
      // console.log("para")
      // this.filterService.idNEW = true;
      // this.filterService.idIN_PROCESSING = true;
      // this.filterService.idDROPPED_OUT = true;
    }
    console.log(status)
    const URL =
      'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate/GetList';
    const headers = new HttpHeaders({ accept: 'application/json' });
    const body = {
      recruitmentId: this.queryParamProjectId,
      status: status,
      stage: stage,
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
        console.log(res.data)
        if (res.statusText === 'OK') {
          this.listLength = res.data.totalCount;
          this.pageSize = res.data.paging.pageSize;
          this.pageIndex = res.data.paging.pageNumber - 1;
          this._candidates.next(res.data.candidateInfoForListDTOs);
          //return res.data.candidateInfoForListDTOs;
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
  public async getAllCandidates(): Promise<void> {
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
          console.log('Fetched candidates for kanban');

          // return res.data.candidateInfoForListDTOs;

          this._candidatesAll.next(res.data.candidateInfoForListDTOs);
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
