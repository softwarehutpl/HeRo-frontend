import { Injectable } from '@angular/core';
import { Candidate } from '../../interfaces/candidate';
@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor() {}

  // @UseMock(true, 'candidates.json') //

  public async getAllCandidates() {
    let useMock = true;
    let mockFile = 'candidates.json';

    let result;
    if (useMock) {
      const Path: Array<Candidate> = require('../../mockups/' + mockFile);
      // require(this.mocksDirectory + mockParam);
      let array = [];
      result = Path.forEach((element) => {
        array.push(element);
      });
    } else {
      //this.axiosInstance.get('...');
    }

    return result;
  }
}


/**
 * does require() work in Angular? 
 * 
 * axios + RxJS?
 * 
 * Custom decorators - how to create, use, read params
 * 
 * 
 */