import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesSidenavComponent } from './candidates-sidenav.component';

describe('CandidatesSidenavComponent', () => {
  let component: CandidatesSidenavComponent;
  let fixture: ComponentFixture<CandidatesSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
