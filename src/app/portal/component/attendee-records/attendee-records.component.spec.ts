import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeRecordsComponent } from './attendee-records.component';

describe('AttendeeRecordsComponent', () => {
  let component: AttendeeRecordsComponent;
  let fixture: ComponentFixture<AttendeeRecordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendeeRecordsComponent]
    });
    fixture = TestBed.createComponent(AttendeeRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
