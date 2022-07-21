import { TestBed } from '@angular/core/testing';

import { CandidatesDataService } from './candidates-data.service';

describe('CandidatesDataService', () => {
  let service: CandidatesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidatesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
