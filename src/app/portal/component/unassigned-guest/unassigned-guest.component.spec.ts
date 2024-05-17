import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedGuestComponent } from './unassigned-guest.component';

describe('UnassignedGuestComponent', () => {
  let component: UnassignedGuestComponent;
  let fixture: ComponentFixture<UnassignedGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnassignedGuestComponent]
    });
    fixture = TestBed.createComponent(UnassignedGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
