import { Injectable } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';
import { useMocks } from '../../mockups/useMocks';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor() {}
  // allCandidates = this.getAllCandidates();

  @useMocks(true, import(`@mocks/candidates.json`))
  // if true -> overrides function and returns data from path.
  public async getAllCandidates() {
    console.log('Hello from CandidatesService');
    // this.axiosInstance.get('...')
    let result: any = [];
    return result;
  }





  public url = 'https://swh-t-praktyki2022-app.azurewebsites.net/Candidate';

  async getCandidate(id:any): Promise<Candidate> {
    this.url += '/Get/'+ id;
    return await axios.get(this.url ,  { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error get Candiate: " + error);
      });
  }
}
