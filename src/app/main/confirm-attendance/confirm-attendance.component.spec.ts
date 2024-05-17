import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAttendanceComponent } from './confirm-attendance.component';

describe('ConfirmAttendanceComponent', () => {
  let component: ConfirmAttendanceComponent;
  let fixture: ComponentFixture<ConfirmAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAttendanceComponent]
    });
    fixture = TestBed.createComponent(ConfirmAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
