import { Injectable } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';
import { useMocks } from '../../mockups/useMocks';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor() {}
  // Don't call methods in class body. Move that to consturctor.
  allCandidates = this.getAllCandidates();


  @useMocks(true, import(`@mocks/candidates.json`))
  // if true -> overrides function and returns data from path.
  public async getAllCandidates() {
    console.log('Hello from CandidatesService');
    // this.axiosInstance.get('...')
    let result: any = [];
    return result;
  }
}
