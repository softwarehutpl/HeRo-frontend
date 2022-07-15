import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHeadComponent } from './calendar-head.component';

describe('CalendarHeadComponent', () => {
  let component: CalendarHeadComponent;
  let fixture: ComponentFixture<CalendarHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
