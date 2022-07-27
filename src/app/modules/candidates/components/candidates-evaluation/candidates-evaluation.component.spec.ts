import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesEvaluationComponent } from './candidates-evaluation.component';

describe('CandidatesEvaluationComponent', () => {
  let component: CandidatesEvaluationComponent;
  let fixture: ComponentFixture<CandidatesEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
