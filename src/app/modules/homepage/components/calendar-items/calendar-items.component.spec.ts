import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarItemsComponent } from './calendar-items.component';

describe('CalendarItemsComponent', () => {
  let component: CalendarItemsComponent;
  let fixture: ComponentFixture<CalendarItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
