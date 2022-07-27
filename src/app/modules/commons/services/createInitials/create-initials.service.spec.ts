import { TestBed } from '@angular/core/testing';

import { CreateInitialsService } from './create-initials.service';

describe('CreateInitialsService', () => {
  let service: CreateInitialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateInitialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
